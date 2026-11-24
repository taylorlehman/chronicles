package com.taylorlehman.chronicles.eldermere

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class WebBridgeSupportTest {

    @Test
    fun safeAreaInsets_convertsPixelsToDpAndFormatsCssScript() {
        val insets = SafeAreaInsets.fromPixels(
            topPx = 108,
            bottomPx = 72,
            leftPx = 0,
            rightPx = 24,
            density = 3.0f,
        )
        assertEquals(36f, insets.topDp, 0.001f)
        assertEquals(24f, insets.bottomDp, 0.001f)
        assertEquals(0f, insets.leftDp, 0.001f)
        assertEquals(8f, insets.rightDp, 0.001f)

        val script = insets.toCssInjectionScript()
        assertTrue(script.contains("'--safe-top','36.00px'"))
        assertTrue(script.contains("'--safe-bottom','24.00px'"))
        assertTrue(script.contains("'--safe-left','0.00px'"))
        assertTrue(script.contains("'--safe-right','8.00px'"))
    }

    @Test
    fun safeAreaInsets_clampsNegativeValuesAndZeroDensity() {
        val insets = SafeAreaInsets.fromPixels(
            topPx = -10,
            bottomPx = 16,
            leftPx = 0,
            rightPx = 0,
            density = 0f,
        )
        assertEquals(0f, insets.topDp, 0.001f)
        assertEquals(16f, insets.bottomDp, 0.001f)
    }

    @Test
    fun hapticStyle_parsesKnownAndUnknownWireValues() {
        assertEquals(HapticStyle.TAP, HapticStyle.fromWireValue("tap"))
        assertEquals(HapticStyle.SELECT, HapticStyle.fromWireValue("SELECT"))
        assertEquals(HapticStyle.COMBAT, HapticStyle.fromWireValue(" combat "))
        assertEquals(HapticStyle.CAPTURE, HapticStyle.fromWireValue("capture"))
        assertEquals(HapticStyle.VICTORY, HapticStyle.fromWireValue("victory"))
        assertEquals(HapticStyle.TAP, HapticStyle.fromWireValue(null))
        assertEquals(HapticStyle.TAP, HapticStyle.fromWireValue("unknown"))
    }

    @Test
    fun webOriginPolicy_allowsOnlyBundledAssetsAndFontsOverHttps() {
        assertTrue(WebOriginPolicy.isAppAssetUrl("https", "appassets.androidplatform.net"))
        assertFalse(WebOriginPolicy.isAppAssetUrl("http", "appassets.androidplatform.net"))
        assertFalse(WebOriginPolicy.isAppAssetUrl("file", ""))
        assertFalse(WebOriginPolicy.isAppAssetUrl("https", "example.com"))

        assertTrue(WebOriginPolicy.isAllowedSubresourceUrl("https", "appassets.androidplatform.net"))
        assertTrue(WebOriginPolicy.isAllowedSubresourceUrl("https", "fonts.googleapis.com"))
        assertTrue(WebOriginPolicy.isAllowedSubresourceUrl("https", "fonts.gstatic.com"))
        assertFalse(WebOriginPolicy.isAllowedSubresourceUrl("http", "fonts.googleapis.com"))
        assertFalse(WebOriginPolicy.isAllowedSubresourceUrl("https", "evil.example"))
    }

    @Test
    fun splashDismissPolicy_enforcesMinimumDisplayDuration() {
        assertEquals(1500L, SplashDismissPolicy.remainingDelayMs(launchElapsedMs = 1000L, nowElapsedMs = 1000L))
        assertEquals(900L, SplashDismissPolicy.remainingDelayMs(launchElapsedMs = 1000L, nowElapsedMs = 1600L))
        assertEquals(0L, SplashDismissPolicy.remainingDelayMs(launchElapsedMs = 1000L, nowElapsedMs = 3000L))
    }
}
