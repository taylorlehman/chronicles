package com.taylorlehman.chronicles.eldermere

import java.util.Locale
import kotlin.math.max

/**
 * Safe-area insets expressed in CSS px (Android dp) to mirror edge-to-edge system bars
 * and display cutouts into the web HUD without clipping.
 */
data class SafeAreaInsets(
    val topDp: Float,
    val bottomDp: Float,
    val leftDp: Float,
    val rightDp: Float,
) {
    fun toCssInjectionScript(): String {
        val top = formatDp(topDp)
        val bottom = formatDp(bottomDp)
        val left = formatDp(leftDp)
        val right = formatDp(rightDp)
        return "(function(){var s=document.documentElement&&document.documentElement.style;" +
            "if(!s)return;" +
            "s.setProperty('--safe-top','${top}px');" +
            "s.setProperty('--safe-bottom','${bottom}px');" +
            "s.setProperty('--safe-left','${left}px');" +
            "s.setProperty('--safe-right','${right}px');" +
            "})();"
    }

    companion object {
        val ZERO = SafeAreaInsets(0f, 0f, 0f, 0f)

        fun fromPixels(
            topPx: Int,
            bottomPx: Int,
            leftPx: Int,
            rightPx: Int,
            density: Float,
        ): SafeAreaInsets {
            val safeDensity = if (density > 0f) density else 1f
            return SafeAreaInsets(
                topDp = max(0, topPx) / safeDensity,
                bottomDp = max(0, bottomPx) / safeDensity,
                leftDp = max(0, leftPx) / safeDensity,
                rightDp = max(0, rightPx) / safeDensity,
            )
        }

        private fun formatDp(value: Float): String =
            String.format(Locale.US, "%.2f", max(0f, value))
    }
}

enum class HapticStyle {
    TAP,
    SELECT,
    COMBAT,
    CAPTURE,
    VICTORY;

    companion object {
        fun fromWireValue(raw: String?): HapticStyle = when (raw?.trim()?.lowercase(Locale.US)) {
            "select" -> SELECT
            "combat" -> COMBAT
            "capture" -> CAPTURE
            "victory" -> VICTORY
            else -> TAP
        }
    }
}

object WebOriginPolicy {
    const val APP_HOST = "appassets.androidplatform.net"
    const val ENTRY_URL = "https://$APP_HOST/assets/www/index.html"

    private val FONT_HOSTS = setOf(
        "fonts.googleapis.com",
        "fonts.gstatic.com",
    )

    fun isAppAssetUrl(scheme: String?, host: String?): Boolean =
        scheme.equals("https", ignoreCase = true) && host.equals(APP_HOST, ignoreCase = true)

    fun isAllowedSubresourceUrl(scheme: String?, host: String?): Boolean {
        if (!scheme.equals("https", ignoreCase = true)) return false
        val normalizedHost = host?.lowercase(Locale.US) ?: return false
        return normalizedHost == APP_HOST || normalizedHost in FONT_HOSTS
    }
}

object SplashDismissPolicy {
    const val MIN_SPLASH_DISPLAY_MS = 1500L
    const val MAX_SPLASH_TIMEOUT_MS = 6000L
    const val FADE_OUT_DURATION_MS = 450L

    fun remainingDelayMs(launchElapsedMs: Long, nowElapsedMs: Long): Long {
        val elapsed = max(0L, nowElapsedMs - launchElapsedMs)
        return max(0L, MIN_SPLASH_DISPLAY_MS - elapsed)
    }
}
