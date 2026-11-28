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
    /**
     * True when this launch began as a first-run session (sizzle had not been seen yet at init).
     * Remains true for the full Activity launch session even after playback marks sizzle seen in
     * persistent storage so the WebView can auto-start directly into the tutorial.
     */
    val isFirstRunSession: Boolean = !store.hasSeenSizzleVideo()

    var phase: SizzlePlaybackPhase = if (isFirstRunSession) {
        SizzlePlaybackPhase.WAITING_FOR_LOADING
    } else {
        SizzlePlaybackPhase.NOT_NEEDED
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

enum class SizzleVideoVariant {
    PORTRAIT,
    LANDSCAPE,
}

/**
 * Selects the portrait (9:16) or landscape (16:9) sizzle video resource based on orientation.
 */
object SizzleMediaSelector {
    fun selectVariant(isLandscape: Boolean): SizzleVideoVariant =
        if (isLandscape) SizzleVideoVariant.LANDSCAPE else SizzleVideoVariant.PORTRAIT

    fun selectRawResId(
        isLandscape: Boolean,
        portraitResId: Int,
        landscapeResId: Int,
    ): Int = if (isLandscape) landscapeResId else portraitResId
}

/**
 * Aspect-preserving transform for rendering a portrait (9:16) or landscape (16:9) video onto
 * a TextureView without stretching or squishing on any phone/tablet aspect ratio.
 *
 * - When viewport orientation matches video orientation (portrait-in-portrait, landscape-in-landscape,
 *   or square viewport): center-crop so playback is full-bleed edge-to-edge with zero black bars.
 * - When viewport and video orientations mismatch (e.g. device rotated mid-playback): center-fit so
 *   captions and framing are never clipped off the edges.
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
            isLandscapeViewport: Boolean = viewWidth > viewHeight,
        ): VideoViewportTransform {
            if (viewWidth <= 0 || viewHeight <= 0 || videoWidth <= 0 || videoHeight <= 0) {
                return IDENTITY
            }
            val viewAspect = viewWidth.toFloat() / viewHeight.toFloat()
            val videoAspect = videoWidth.toFloat() / videoHeight.toFloat()
            val pivotX = viewWidth / 2f
            val pivotY = viewHeight / 2f

            val isLandscapeVideo = videoWidth > videoHeight
            val isSquareViewport = viewWidth == viewHeight
            val orientationsMatch = isSquareViewport || (isLandscapeViewport == isLandscapeVideo)

            return if (orientationsMatch) {
                // Center-crop: fill the full viewport edge-to-edge while preserving exact video aspect ratio.
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
                // Orientation mismatch: center-fit to preserve full frame & captions without distortion.
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
