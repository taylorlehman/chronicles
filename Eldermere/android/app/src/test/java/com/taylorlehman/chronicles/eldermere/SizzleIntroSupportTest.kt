package com.taylorlehman.chronicles.eldermere

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class SizzleIntroSupportTest {

    private class InMemorySizzleStore(initialSeen: Boolean = false) : SizzleIntroStore {
        var seen: Boolean = initialSeen
            private set
        var markSeenCalls: Int = 0
            private set

        override fun hasSeenSizzleVideo(): Boolean = seen

        override fun markSizzleVideoSeen() {
            seen = true
            markSeenCalls += 1
        }
    }

    @Test
    fun firstRun_prePreparedDuringLoading_playsAfterLoadingAndMarksSeen() {
        val store = InMemorySizzleStore(initialSeen = false)
        val machine = SizzleIntroStateMachine(store)

        assertEquals(SizzlePlaybackPhase.WAITING_FOR_LOADING, machine.phase)
        assertTrue(machine.shouldPrepareSizzle)
        assertFalse(machine.isSizzleOverlayActive)
        assertFalse(machine.shouldHandleBackPress)
        assertFalse(machine.isMuted)

        // MediaPlayer prepares while loading screen is still showing
        assertEquals(SizzleAction.NONE, machine.onMediaPrepared(isActivityResumed = true))
        assertTrue(machine.isMediaPrepared)
        assertFalse(store.seen)

        // Loading overlay dismisses -> video starts immediately & marks seen
        assertEquals(
            SizzleAction.START_PLAYBACK,
            machine.onLoadingOverlayDismissed(isActivityResumed = true),
        )
        assertEquals(SizzlePlaybackPhase.PLAYING, machine.phase)
        assertTrue(machine.isSizzleOverlayActive)
        assertTrue(machine.shouldHandleBackPress)
        assertTrue(store.seen)

        // Video completes naturally -> reveals Start Game menu
        assertEquals(SizzleAction.FINISH_AND_REVEAL_GAME, machine.onPlaybackCompleted())
        assertEquals(SizzlePlaybackPhase.FINISHED, machine.phase)
        assertFalse(machine.isSizzleOverlayActive)
        assertFalse(machine.shouldHandleBackPress)

        // Subsequent completion or skip calls are safe no-ops
        assertEquals(SizzleAction.NONE, machine.onPlaybackCompleted())
        assertEquals(SizzleAction.NONE, machine.onSkipRequested())
    }

    @Test
    fun firstRun_loadingDismissesBeforeMediaPrepared_waitsThenStartsOnPrepared() {
        val store = InMemorySizzleStore(initialSeen = false)
        val machine = SizzleIntroStateMachine(store)

        assertEquals(
            SizzleAction.WAIT_FOR_PREPARE,
            machine.onLoadingOverlayDismissed(isActivityResumed = true),
        )
        assertEquals(SizzlePlaybackPhase.WAITING_FOR_PREPARE, machine.phase)
        assertTrue(machine.isSizzleOverlayActive)
        assertTrue(machine.shouldHandleBackPress)

        assertEquals(
            SizzleAction.START_PLAYBACK,
            machine.onMediaPrepared(isActivityResumed = true),
        )
        assertEquals(SizzlePlaybackPhase.PLAYING, machine.phase)
        assertTrue(store.seen)
    }

    @Test
    fun subsequentLaunch_skipsSizzleCompletely() {
        val store = InMemorySizzleStore(initialSeen = true)
        val machine = SizzleIntroStateMachine(store)

        assertEquals(SizzlePlaybackPhase.NOT_NEEDED, machine.phase)
        assertFalse(machine.shouldPrepareSizzle)
        assertFalse(machine.isSizzleOverlayActive)
        assertFalse(machine.shouldHandleBackPress)

        assertEquals(
            SizzleAction.NONE,
            machine.onLoadingOverlayDismissed(isActivityResumed = true),
        )
        assertEquals(SizzlePlaybackPhase.NOT_NEEDED, machine.phase)
        assertEquals(0, store.markSeenCalls)
    }

    @Test
    fun skipDuringPlaybackOrPrepare_marksSeenAndRevealsGame() {
        val store = InMemorySizzleStore(initialSeen = false)
        val machine = SizzleIntroStateMachine(store)

        machine.onMediaPrepared(isActivityResumed = true)
        machine.onLoadingOverlayDismissed(isActivityResumed = true)
        assertEquals(SizzlePlaybackPhase.PLAYING, machine.phase)

        assertEquals(SizzleAction.FINISH_AND_REVEAL_GAME, machine.onSkipRequested())
        assertEquals(SizzlePlaybackPhase.FINISHED, machine.phase)
        assertTrue(store.seen)
        assertFalse(machine.shouldHandleBackPress)
    }

    @Test
    fun pauseAndResume_preservesActiveSizzleAndResumesCleanly() {
        val store = InMemorySizzleStore(initialSeen = false)
        val machine = SizzleIntroStateMachine(store)

        machine.onMediaPrepared(isActivityResumed = true)
        machine.onLoadingOverlayDismissed(isActivityResumed = true)
        assertEquals(SizzlePlaybackPhase.PLAYING, machine.phase)

        assertEquals(SizzleAction.PAUSE_PLAYBACK, machine.onActivityPaused())
        assertEquals(SizzlePlaybackPhase.PAUSED, machine.phase)
        assertTrue(machine.shouldHandleBackPress)

        assertEquals(SizzleAction.RESUME_PLAYBACK, machine.onActivityResumed())
        assertEquals(SizzlePlaybackPhase.PLAYING, machine.phase)
    }

    @Test
    fun loadingDismissedWhileBackgrounded_defersStartUntilResumed() {
        val store = InMemorySizzleStore(initialSeen = false)
        val machine = SizzleIntroStateMachine(store)

        machine.onMediaPrepared(isActivityResumed = false)
        assertEquals(
            SizzleAction.NONE,
            machine.onLoadingOverlayDismissed(isActivityResumed = false),
        )
        assertEquals(SizzlePlaybackPhase.PAUSED, machine.phase)
        assertFalse(store.seen)

        assertEquals(SizzleAction.RESUME_PLAYBACK, machine.onActivityResumed())
        assertEquals(SizzlePlaybackPhase.PLAYING, machine.phase)
        assertTrue(store.seen)
    }

    @Test
    fun playbackErrorOrTimeout_alwaysFallsBackToGameAndMarksSeen() {
        val store = InMemorySizzleStore(initialSeen = false)
        val machine = SizzleIntroStateMachine(store)

        // Even an error while loading overlay is still up cleanly disables sizzle
        assertEquals(SizzleAction.FINISH_AND_REVEAL_GAME, machine.onPlaybackErrorOrTimeout())
        assertEquals(SizzlePlaybackPhase.FINISHED, machine.phase)
        assertTrue(store.seen)
        assertEquals(
            SizzleAction.NONE,
            machine.onLoadingOverlayDismissed(isActivityResumed = true),
        )
    }

    @Test
    fun muteToggle_defaultsUnmutedAndToggles() {
        val machine = SizzleIntroStateMachine(InMemorySizzleStore())
        assertFalse(machine.isMuted)
        assertTrue(machine.toggleMute())
        assertTrue(machine.isMuted)
        assertFalse(machine.toggleMute())
        assertFalse(machine.isMuted)
    }

    @Test
    fun videoViewportTransform_exactNineBySixteenPortrait_isIdentityScale() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 1080,
            viewHeight = 1920,
            videoWidth = 1080,
            videoHeight = 1920,
        )
        assertEquals(1f, transform.scaleX, 0.0001f)
        assertEquals(1f, transform.scaleY, 0.0001f)
        assertEquals(540f, transform.pivotX, 0.0001f)
        assertEquals(960f, transform.pivotY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_tallPortraitPhone_centerCropsHorizontallyWithoutStretch() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 1080,
            viewHeight = 2400,
            videoWidth = 1080,
            videoHeight = 1920,
        )
        // 9:16 = 0.5625, 1080/2400 = 0.45 -> scaleX = 1.25, scaleY = 1.0
        assertEquals(1.25f, transform.scaleX, 0.0001f)
        assertEquals(1f, transform.scaleY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_widerPortraitTablet_centerCropsVerticallyWithoutStretch() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 1500,
            viewHeight = 2000,
            videoWidth = 1080,
            videoHeight = 1920,
        )
        // viewAspect = 0.75, videoAspect = 0.5625 -> scaleX = 1.0, scaleY = 1.3333
        assertEquals(1f, transform.scaleX, 0.0001f)
        assertEquals(0.75f / 0.5625f, transform.scaleY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_landscapeScreen_centerFitsWithoutClippingCaptions() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 1920,
            viewHeight = 1080,
            videoWidth = 1080,
            videoHeight = 1920,
        )
        // viewAspect = 16/9, videoAspect = 9/16 -> center-fit scaleX = (9/16)/(16/9) = 81/256
        assertEquals(81f / 256f, transform.scaleX, 0.0001f)
        assertEquals(1f, transform.scaleY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_zeroDimensions_returnsSafeIdentity() {
        assertEquals(
            VideoViewportTransform.IDENTITY,
            VideoViewportTransform.compute(0, 1920, 1080, 1920),
        )
        assertEquals(
            VideoViewportTransform.IDENTITY,
            VideoViewportTransform.compute(1080, 1920, 0, 1920),
        )
    }
}
