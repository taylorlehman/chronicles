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

        override fun clearAll() {
            seen = false
        }
    }

    @Test
    fun clearAll_resetsSeenFlagSoNextLaunchPlaysSizzleAgain() {
        val store = InMemorySizzleStore(initialSeen = true)
        assertEquals(SizzlePlaybackPhase.NOT_NEEDED, SizzleIntroStateMachine(store).phase)

        store.clearAll()

        val nextLaunchMachine = SizzleIntroStateMachine(store)
        assertFalse(store.hasSeenSizzleVideo())
        assertEquals(SizzlePlaybackPhase.WAITING_FOR_LOADING, nextLaunchMachine.phase)
        assertTrue(nextLaunchMachine.shouldPrepareSizzle)
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
    fun videoViewportTransform_landscapeScreenWithPortraitVideo_centerFitsWithoutClippingCaptions() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 1920,
            viewHeight = 1080,
            videoWidth = 1080,
            videoHeight = 1920,
            isLandscapeViewport = true,
        )
        // viewAspect = 16/9, videoAspect = 9/16 -> orientation mismatch -> center-fit scaleX = 81/256
        assertEquals(81f / 256f, transform.scaleX, 0.0001f)
        assertEquals(1f, transform.scaleY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_portraitScreenWithLandscapeVideo_centerFitsWithoutClippingCaptions() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 1080,
            viewHeight = 1920,
            videoWidth = 1920,
            videoHeight = 1080,
            isLandscapeViewport = false,
        )
        // viewAspect = 9/16, videoAspect = 16/9 -> orientation mismatch -> center-fit scaleY = 81/256
        assertEquals(1f, transform.scaleX, 0.0001f)
        assertEquals(81f / 256f, transform.scaleY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_exactSixteenByNineLandscape_isIdentityScale() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 1920,
            viewHeight = 1080,
            videoWidth = 1280,
            videoHeight = 720,
            isLandscapeViewport = true,
        )
        assertEquals(1f, transform.scaleX, 0.0001f)
        assertEquals(1f, transform.scaleY, 0.0001f)
        assertEquals(960f, transform.pivotX, 0.0001f)
        assertEquals(540f, transform.pivotY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_landscapeSixteenByTenTablet_centerCropsHorizontallyFullBleed() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 2560,
            viewHeight = 1600,
            videoWidth = 1280,
            videoHeight = 720,
            isLandscapeViewport = true,
        )
        // viewAspect = 1.6, videoAspect = 16/9 (1.7778) -> full-bleed center-crop scaleX = (16/9)/1.6
        assertEquals((16f / 9f) / 1.6f, transform.scaleX, 0.0001f)
        assertEquals(1f, transform.scaleY, 0.0001f)
    }

    @Test
    fun videoViewportTransform_ultrawideLandscape_centerCropsVerticallyFullBleed() {
        val transform = VideoViewportTransform.compute(
            viewWidth = 2400,
            viewHeight = 1080,
            videoWidth = 1280,
            videoHeight = 720,
            isLandscapeViewport = true,
        )
        // viewAspect = 2400/1080 (2.2222), videoAspect = 16/9 -> full-bleed center-crop scaleY = 1.25
        assertEquals(1f, transform.scaleX, 0.0001f)
        assertEquals(1.25f, transform.scaleY, 0.0001f)
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

    @Test
    fun sizzleMediaSelector_selectsLandscapeOrPortraitVariantAndResource() {
        assertEquals(SizzleVideoVariant.PORTRAIT, SizzleMediaSelector.selectVariant(isLandscape = false))
        assertEquals(SizzleVideoVariant.LANDSCAPE, SizzleMediaSelector.selectVariant(isLandscape = true))
        assertEquals(
            101,
            SizzleMediaSelector.selectRawResId(isLandscape = false, portraitResId = 101, landscapeResId = 202),
        )
        assertEquals(
            202,
            SizzleMediaSelector.selectRawResId(isLandscape = true, portraitResId = 101, landscapeResId = 202),
        )
    }

    @Test
    fun isFirstRunSession_andBridgeAutoStartTutorial_stayTrueForEntireFirstLaunchOnly() {
        val firstRunStore = InMemorySizzleStore(initialSeen = false)
        val firstRunMachine = SizzleIntroStateMachine(firstRunStore)
        val firstRunBridge = EldermereJsBridge(
            onGameReadyCallback = {},
            onHapticCallback = {},
            shouldAutoStartTutorialProvider = { firstRunMachine.isFirstRunSession },
        )

        assertTrue(firstRunMachine.isFirstRunSession)
        assertTrue(firstRunBridge.shouldAutoStartTutorial())

        // Even after playback starts and marks sizzle seen, this session stays a first-run session.
        firstRunMachine.onMediaPrepared(isActivityResumed = true)
        firstRunMachine.onLoadingOverlayDismissed(isActivityResumed = true)
        assertTrue(firstRunStore.seen)
        assertTrue(firstRunMachine.isFirstRunSession)
        assertTrue(firstRunBridge.shouldAutoStartTutorial())

        // And after completion / skip, shouldAutoStartTutorial remains true for the launch session.
        firstRunMachine.onPlaybackCompleted()
        assertEquals(SizzlePlaybackPhase.FINISHED, firstRunMachine.phase)
        assertTrue(firstRunMachine.isFirstRunSession)
        assertTrue(firstRunBridge.shouldAutoStartTutorial())

        // Next launch sees hasSeenSizzleVideo() == true -> returns false.
        val secondLaunchMachine = SizzleIntroStateMachine(firstRunStore)
        val secondLaunchBridge = EldermereJsBridge(
            onGameReadyCallback = {},
            onHapticCallback = {},
            shouldAutoStartTutorialProvider = { secondLaunchMachine.isFirstRunSession },
        )
        assertFalse(secondLaunchMachine.isFirstRunSession)
        assertFalse(secondLaunchBridge.shouldAutoStartTutorial())
    }
}
