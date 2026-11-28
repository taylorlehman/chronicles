package com.taylorlehman.chronicles.eldermere

import android.webkit.JavascriptInterface

/**
 * Narrow, read-safe JavaScript bridge exposed to the bundled offline WebView as
 * `window.EldermereAndroid`.
 */
class EldermereJsBridge(
    private val onGameReadyCallback: () -> Unit,
    private val onHapticCallback: (HapticStyle) -> Unit,
    private val onResetAppStateAndExitCallback: () -> Unit = {},
    private val shouldAutoStartTutorialProvider: () -> Boolean = { false },
) {
    @JavascriptInterface
    fun onGameReady() {
        onGameReadyCallback()
    }

    @JavascriptInterface
    fun haptic(style: String?) {
        onHapticCallback(HapticStyle.fromWireValue(style))
    }

    @JavascriptInterface
    fun resetAppStateAndExit() {
        onResetAppStateAndExitCallback()
    }

    @JavascriptInterface
    fun shouldAutoStartTutorial(): Boolean = shouldAutoStartTutorialProvider()
}
