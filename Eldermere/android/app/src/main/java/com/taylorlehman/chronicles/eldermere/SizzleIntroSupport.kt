package com.taylorlehman.chronicles.eldermere

import android.content.Context
import android.graphics.Matrix

/**
 * Persistence abstraction for first-run sizzle video state so the state machine
 * remains pure Kotlin and fully unit-testable on the JVM.
 */
interface SizzleIntroStore {
    fun hasSeenSizzleVideo(): Boolean
    fun markSizzleVideoSeen()
    fun clearAll()
}

class SharedPreferencesSizzleStore(context: Context) : SizzleIntroStore {
    private val prefs = context.applicationContext.getSharedPreferences(
        PREFS_NAME,
        Context.MODE_PRIVATE,
    )

    override fun hasSeenSizzleVideo(): Boolean =
        prefs.getBoolean(KEY_HAS_SEEN_SIZZLE_VIDEO, false)

    override fun markSizzleVideoSeen() {
        prefs.edit().putBoolean(KEY_HAS_SEEN_SIZZLE_VIDEO, true).apply()
    }

    override fun clearAll() {
        prefs.edit().clear().commit()
    }

    companion object {
        const val PREFS_NAME = "eldermere_prefs"
        const val KEY_HAS_SEEN_SIZZLE_VIDEO = "has_seen_sizzle_video"
    }
}

enum class SizzlePlaybackPhase {
    NOT_NEEDED,
    WAITING_FOR_LOADING,
    WAITING_FOR_PREPARE,
    PLAYING,
    PAUSED,
    FINISHED,
}

enum class SizzleAction {
    NONE,
    START_PLAYBACK,
    WAIT_FOR_PREPARE,
    PAUSE_PLAYBACK,
    RESUME_PLAYBACK,
    FINISH_AND_REVEAL_GAME,
}

/**
 * Coordinates the lifecycle of the first-run sizzle intro video between
 * the native Launch Loading Screen and the WebView Start Game menu.
 */
class SizzleIntroStateMachine(
    private val store: SizzleIntroStore,
) {
    var phase: SizzlePlaybackPhase = if (store.hasSeenSizzleVideo()) {
        SizzlePlaybackPhase.NOT_NEEDED
    } else {
        SizzlePlaybackPhase.WAITING_FOR_LOADING
    }
        private set

    var isMediaPrepared: Boolean = false
        private set

    var isMuted: Boolean = false
        private set

    val shouldPrepareSizzle: Boolean
        get() = phase == SizzlePlaybackPhase.WAITING_FOR_LOADING

    val isSizzleOverlayActive: Boolean
        get() = phase == SizzlePlaybackPhase.WAITING_FOR_PREPARE ||
            phase == SizzlePlaybackPhase.PLAYING ||
            phase == SizzlePlaybackPhase.PAUSED

    val shouldHandleBackPress: Boolean
        get() = isSizzleOverlayActive

    fun onMediaPrepared(isActivityResumed: Boolean): SizzleAction {
        if (phase == SizzlePlaybackPhase.NOT_NEEDED || phase == SizzlePlaybackPhase.FINISHED) {
            return SizzleAction.NONE
        }
        isMediaPrepared = true
        return when (phase) {
            SizzlePlaybackPhase.WAITING_FOR_PREPARE -> {
                if (isActivityResumed) {
                    phase = SizzlePlaybackPhase.PLAYING
                    store.markSizzleVideoSeen()
                    SizzleAction.START_PLAYBACK
                } else {
                    phase = SizzlePlaybackPhase.PAUSED
                    SizzleAction.NONE
                }
            }
            SizzlePlaybackPhase.PLAYING -> SizzleAction.START_PLAYBACK
            else -> SizzleAction.NONE
        }
    }

    fun onLoadingOverlayDismissed(isActivityResumed: Boolean): SizzleAction {
        if (phase != SizzlePlaybackPhase.WAITING_FOR_LOADING) {
            return SizzleAction.NONE
        }
        if (!isMediaPrepared) {
            phase = if (isActivityResumed) {
                SizzlePlaybackPhase.WAITING_FOR_PREPARE
            } else {
                SizzlePlaybackPhase.PAUSED
            }
            return if (isActivityResumed) {
                SizzleAction.WAIT_FOR_PREPARE
            } else {
                SizzleAction.NONE
            }
        }
        return if (isActivityResumed) {
            phase = SizzlePlaybackPhase.PLAYING
            store.markSizzleVideoSeen()
            SizzleAction.START_PLAYBACK
        } else {
            phase = SizzlePlaybackPhase.PAUSED
            SizzleAction.NONE
        }
    }

    fun onActivityPaused(): SizzleAction {
        return when (phase) {
            SizzlePlaybackPhase.PLAYING -> {
                phase = SizzlePlaybackPhase.PAUSED
                SizzleAction.PAUSE_PLAYBACK
            }
            SizzlePlaybackPhase.WAITING_FOR_PREPARE -> {
                phase = SizzlePlaybackPhase.PAUSED
                SizzleAction.NONE
            }
            else -> SizzleAction.NONE
        }
    }

    fun onActivityResumed(): SizzleAction {
        if (phase != SizzlePlaybackPhase.PAUSED) {
            return SizzleAction.NONE
        }
        return if (isMediaPrepared) {
            phase = SizzlePlaybackPhase.PLAYING
            store.markSizzleVideoSeen()
            SizzleAction.RESUME_PLAYBACK
        } else {
            phase = SizzlePlaybackPhase.WAITING_FOR_PREPARE
            SizzleAction.WAIT_FOR_PREPARE
        }
    }

    fun onSkipRequested(): SizzleAction = finishActiveSizzle()

    fun onPlaybackCompleted(): SizzleAction = finishActiveSizzle()

    fun onPlaybackErrorOrTimeout(): SizzleAction {
        if (phase == SizzlePlaybackPhase.NOT_NEEDED || phase == SizzlePlaybackPhase.FINISHED) {
            return SizzleAction.NONE
        }
        phase = SizzlePlaybackPhase.FINISHED
        store.markSizzleVideoSeen()
        return SizzleAction.FINISH_AND_REVEAL_GAME
    }

    fun toggleMute(): Boolean {
        isMuted = !isMuted
        return isMuted
    }

    private fun finishActiveSizzle(): SizzleAction {
        if (!isSizzleOverlayActive) {
            return SizzleAction.NONE
        }
        phase = SizzlePlaybackPhase.FINISHED
        store.markSizzleVideoSeen()
        return SizzleAction.FINISH_AND_REVEAL_GAME
    }

    companion object {
        const val PREPARE_TIMEOUT_MS = 4000L
        const val FADE_OUT_DURATION_MS = 340L
    }
}

/**
 * Aspect-preserving transform for rendering a 9:16 portrait video onto a TextureView
 * without stretching or squishing on any phone/tablet aspect ratio.
 *
 * - In portrait / square viewports (`viewHeight >= viewWidth`): center-crop so playback is
 *   full-bleed edge-to-edge with zero letterboxing.
 * - In landscape viewports (`viewWidth > viewHeight`): center-fit so captions and framing
 *   of the 9:16 video are never clipped off the top/bottom.
 */
data class VideoViewportTransform(
    val scaleX: Float,
    val scaleY: Float,
    val pivotX: Float,
    val pivotY: Float,
) {
    fun toMatrix(): Matrix = Matrix().apply {
        setScale(scaleX, scaleY, pivotX, pivotY)
    }

    companion object {
        val IDENTITY = VideoViewportTransform(1f, 1f, 0f, 0f)

        fun compute(
            viewWidth: Int,
            viewHeight: Int,
            videoWidth: Int,
            videoHeight: Int,
        ): VideoViewportTransform {
            if (viewWidth <= 0 || viewHeight <= 0 || videoWidth <= 0 || videoHeight <= 0) {
                return IDENTITY
            }
            val viewAspect = viewWidth.toFloat() / viewHeight.toFloat()
            val videoAspect = videoWidth.toFloat() / videoHeight.toFloat()
            val pivotX = viewWidth / 2f
            val pivotY = viewHeight / 2f

            val isPortraitOrSquare = viewHeight >= viewWidth
            return if (isPortraitOrSquare) {
                // Center-crop: fill the full viewport while preserving exact video aspect ratio.
                if (videoAspect > viewAspect) {
                    VideoViewportTransform(
                        scaleX = videoAspect / viewAspect,
                        scaleY = 1f,
                        pivotX = pivotX,
                        pivotY = pivotY,
                    )
                } else {
                    VideoViewportTransform(
                        scaleX = 1f,
                        scaleY = viewAspect / videoAspect,
                        pivotX = pivotX,
                        pivotY = pivotY,
                    )
                }
            } else {
                // Center-fit in landscape: preserve full 9:16 frame & captions without distortion.
                if (videoAspect < viewAspect) {
                    VideoViewportTransform(
                        scaleX = videoAspect / viewAspect,
                        scaleY = 1f,
                        pivotX = pivotX,
                        pivotY = pivotY,
                    )
                } else {
                    VideoViewportTransform(
                        scaleX = 1f,
                        scaleY = viewAspect / videoAspect,
                        pivotX = pivotX,
                        pivotY = pivotY,
                    )
                }
            }
        }
    }
}
