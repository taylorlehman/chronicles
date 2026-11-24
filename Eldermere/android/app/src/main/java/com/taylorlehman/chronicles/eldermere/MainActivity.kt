package com.taylorlehman.chronicles.eldermere

import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.util.Log
import android.view.HapticFeedbackConstants
import android.view.View
import android.view.animation.DecelerateInterpolator
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import androidx.activity.OnBackPressedCallback
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import androidx.webkit.WebViewAssetLoader
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import java.io.ByteArrayInputStream

class MainActivity : AppCompatActivity() {

    private lateinit var rootContainer: FrameLayout
    private lateinit var webView: WebView
    private lateinit var loadingOverlay: FrameLayout
    private lateinit var loadingHeader: LinearLayout
    private lateinit var loadingFooter: LinearLayout
    private lateinit var loadingTipText: TextView
    private lateinit var loadingProgressBar: ProgressBar

    private lateinit var assetLoader: WebViewAssetLoader
    private val mainHandler = Handler(Looper.getMainLooper())

    private var launchElapsedMs: Long = 0L
    private var isPageLoaded: Boolean = false
    private var isOverlayDismissed: Boolean = false
    private var latestSafeInsets: SafeAreaInsets = SafeAreaInsets.ZERO
    private var progressAnimator: ValueAnimator? = null
    private var tipIndex: Int = 0
    private var loadingTips: Array<String> = emptyArray()

    private val fallbackDismissRunnable = Runnable {
        Log.w(LOG_TAG, "Loading overlay fallback timeout reached (${SplashDismissPolicy.MAX_SPLASH_TIMEOUT_MS}ms); dismissing overlay")
        dismissLoadingOverlay()
    }

    private val tipCycleRunnable = object : Runnable {
        override fun run() {
            if (isOverlayDismissed || loadingTips.isEmpty()) return
            tipIndex = (tipIndex + 1) % loadingTips.size
            val nextTip = loadingTips[tipIndex]
            loadingTipText.animate()
                .alpha(0.55f)
                .setDuration(100L)
                .withEndAction {
                    if (isOverlayDismissed) return@withEndAction
                    loadingTipText.text = nextTip
                    loadingTipText.animate()
                        .alpha(1f)
                        .setDuration(140L)
                        .start()
                }
                .start()
            mainHandler.postDelayed(this, TIP_CYCLE_INTERVAL_MS)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        enableEdgeToEdge(
            statusBarStyle = SystemBarStyle.dark(Color.TRANSPARENT),
            navigationBarStyle = SystemBarStyle.dark(Color.TRANSPARENT),
        )
        super.onCreate(savedInstanceState)

        launchElapsedMs = SystemClock.elapsedRealtime()
        setContentView(R.layout.activity_main)

        rootContainer = findViewById(R.id.root_container)
        webView = findViewById(R.id.game_webview)
        loadingOverlay = findViewById(R.id.loading_overlay)
        loadingHeader = findViewById(R.id.loading_header)
        loadingFooter = findViewById(R.id.loading_footer)
        loadingTipText = findViewById(R.id.loading_tip_text)
        loadingProgressBar = findViewById(R.id.loading_progress_bar)
        loadingTips = resources.getStringArray(R.array.loading_tips)

        assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        setupWindowInsets()
        setupLoadingOverlayAnimation()
        setupWebView()
        setupBackNavigation()

        mainHandler.postDelayed(fallbackDismissRunnable, SplashDismissPolicy.MAX_SPLASH_TIMEOUT_MS)
        webView.loadUrl(WebOriginPolicy.ENTRY_URL)
    }

    private fun setupWindowInsets() {
        val baseHeaderTopPadding = loadingHeader.paddingTop
        val baseFooterBottomPadding = loadingFooter.paddingBottom

        ViewCompat.setOnApplyWindowInsetsListener(rootContainer) { _, windowInsets ->
            val bars = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout(),
            )
            loadingHeader.updatePadding(top = baseHeaderTopPadding + bars.top)
            loadingFooter.updatePadding(bottom = baseFooterBottomPadding + bars.bottom)

            latestSafeInsets = SafeAreaInsets.fromPixels(
                topPx = bars.top,
                bottomPx = bars.bottom,
                leftPx = bars.left,
                rightPx = bars.right,
                density = resources.displayMetrics.density,
            )
            if (isPageLoaded) {
                injectSafeAreaInsets(latestSafeInsets)
            }
            windowInsets
        }
        ViewCompat.requestApplyInsets(rootContainer)
    }

    private fun setupLoadingOverlayAnimation() {
        if (loadingTips.isNotEmpty()) {
            loadingTipText.text = loadingTips[0]
            mainHandler.postDelayed(tipCycleRunnable, TIP_CYCLE_INTERVAL_MS)
        }
        progressAnimator = ValueAnimator.ofInt(120, 880).apply {
            duration = SplashDismissPolicy.MIN_SPLASH_DISPLAY_MS
            interpolator = DecelerateInterpolator(1.6f)
            addUpdateListener { animator ->
                loadingProgressBar.progress = animator.animatedValue as Int
            }
            start()
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        webView.setBackgroundColor(Color.parseColor("#0B1221"))
        webView.overScrollMode = View.OVER_SCROLL_NEVER
        webView.isVerticalScrollBarEnabled = false
        webView.isHorizontalScrollBarEnabled = false
        webView.isHapticFeedbackEnabled = true

        with(webView.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            mediaPlaybackRequiresUserGesture = false
            setSupportZoom(false)
            builtInZoomControls = false
            displayZoomControls = false
            useWideViewPort = true
            loadWithOverviewMode = true
            allowFileAccess = false
            allowContentAccess = false
            @Suppress("DEPRECATION")
            allowFileAccessFromFileURLs = false
            @Suppress("DEPRECATION")
            allowUniversalAccessFromFileURLs = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            cacheMode = WebSettings.LOAD_DEFAULT
        }

        val jsBridge = EldermereJsBridge(
            onGameReadyCallback = {
                mainHandler.post { handleGameReady() }
            },
            onHapticCallback = { style ->
                mainHandler.post { performHaptic(style) }
            },
        )
        webView.addJavascriptInterface(jsBridge, JS_BRIDGE_NAME)

        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean {
                val msg = "${consoleMessage.message()} (${consoleMessage.sourceId()}:${consoleMessage.lineNumber()})"
                when (consoleMessage.messageLevel()) {
                    ConsoleMessage.MessageLevel.ERROR -> Log.e(LOG_TAG, msg)
                    ConsoleMessage.MessageLevel.WARNING -> Log.w(LOG_TAG, msg)
                    ConsoleMessage.MessageLevel.DEBUG -> Log.d(LOG_TAG, msg)
                    else -> Log.i(LOG_TAG, msg)
                }
                return true
            }
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest,
            ): WebResourceResponse? {
                val uri = request.url
                if (WebOriginPolicy.isAppAssetUrl(uri.scheme, uri.host)) {
                    return assetLoader.shouldInterceptRequest(uri)
                }
                if (WebOriginPolicy.isAllowedSubresourceUrl(uri.scheme, uri.host)) {
                    return null
                }
                Log.w(LOG_TAG, "Blocked disallowed subresource request: $uri")
                return WebResourceResponse(
                    "text/plain",
                    "utf-8",
                    403,
                    "Forbidden",
                    emptyMap(),
                    ByteArrayInputStream(ByteArray(0)),
                )
            }

            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest,
            ): Boolean {
                val uri = request.url
                return !WebOriginPolicy.isAppAssetUrl(uri.scheme, uri.host)
            }

            override fun onPageFinished(view: WebView, url: String?) {
                super.onPageFinished(view, url)
                isPageLoaded = true
                injectSafeAreaInsets(latestSafeInsets)
            }
        }
    }

    private fun setupBackNavigation() {
        onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    if (!isPageLoaded || !isOverlayDismissed) {
                        showExitConfirmationDialog()
                        return
                    }
                    webView.evaluateJavascript(
                        "(function(){return typeof window.__eldermereHandleBack==='function'?Boolean(window.__eldermereHandleBack()):false;})();",
                    ) { result ->
                        if (result != "true") {
                            showExitConfirmationDialog()
                        }
                    }
                }
            },
        )
    }

    private fun showExitConfirmationDialog() {
        if (isFinishing || isDestroyed) return
        MaterialAlertDialogBuilder(this)
            .setTitle(R.string.exit_dialog_title)
            .setMessage(R.string.exit_dialog_message)
            .setNegativeButton(R.string.exit_dialog_stay, null)
            .setPositiveButton(R.string.exit_dialog_leave) { _, _ ->
                finish()
            }
            .show()
    }

    private fun injectSafeAreaInsets(insets: SafeAreaInsets) {
        if (isDestroyed) return
        webView.evaluateJavascript(insets.toCssInjectionScript(), null)
    }

    private fun handleGameReady() {
        if (isOverlayDismissed) return
        Log.i(LOG_TAG, "EldermereAndroid.onGameReady() received")
        val remainingDelay = SplashDismissPolicy.remainingDelayMs(
            launchElapsedMs = launchElapsedMs,
            nowElapsedMs = SystemClock.elapsedRealtime(),
        )
        progressAnimator?.cancel()
        progressAnimator = ValueAnimator.ofInt(loadingProgressBar.progress, 1000).apply {
            duration = remainingDelay.coerceAtLeast(220L)
            interpolator = DecelerateInterpolator()
            addUpdateListener { animator ->
                loadingProgressBar.progress = animator.animatedValue as Int
            }
            start()
        }
        mainHandler.postDelayed({ dismissLoadingOverlay() }, remainingDelay)
    }

    private fun dismissLoadingOverlay() {
        if (isOverlayDismissed) return
        isOverlayDismissed = true
        mainHandler.removeCallbacks(fallbackDismissRunnable)
        mainHandler.removeCallbacks(tipCycleRunnable)
        progressAnimator?.cancel()
        loadingProgressBar.progress = 1000

        loadingOverlay.animate()
            .alpha(0f)
            .scaleX(1.03f)
            .scaleY(1.03f)
            .setDuration(SplashDismissPolicy.FADE_OUT_DURATION_MS)
            .setInterpolator(DecelerateInterpolator())
            .withEndAction {
                loadingOverlay.visibility = View.GONE
                loadingOverlay.scaleX = 1f
                loadingOverlay.scaleY = 1f
            }
            .start()
    }

    private fun performHaptic(style: HapticStyle) {
        if (isDestroyed) return
        when (style) {
            HapticStyle.TAP -> {
                webView.performHapticFeedback(HapticFeedbackConstants.CLOCK_TICK)
            }
            HapticStyle.SELECT -> {
                webView.performHapticFeedback(HapticFeedbackConstants.CONTEXT_CLICK)
            }
            HapticStyle.COMBAT -> {
                webView.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS)
            }
            HapticStyle.CAPTURE -> {
                val constant = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    HapticFeedbackConstants.CONFIRM
                } else {
                    HapticFeedbackConstants.VIRTUAL_KEY
                }
                webView.performHapticFeedback(constant)
            }
            HapticStyle.VICTORY -> {
                val constant = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    HapticFeedbackConstants.CONFIRM
                } else {
                    HapticFeedbackConstants.LONG_PRESS
                }
                webView.performHapticFeedback(constant)
                mainHandler.postDelayed(
                    {
                        if (!isDestroyed) {
                            webView.performHapticFeedback(constant)
                        }
                    },
                    110L,
                )
            }
        }
    }

    override fun onPause() {
        if (isPageLoaded) {
            webView.evaluateJavascript(
                "if(typeof window.__eldermereSetPaused==='function'){window.__eldermereSetPaused(true);}",
                null,
            )
        }
        webView.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        if (isPageLoaded) {
            injectSafeAreaInsets(latestSafeInsets)
            webView.evaluateJavascript(
                "if(typeof window.__eldermereSetPaused==='function'){window.__eldermereSetPaused(false);}",
                null,
            )
        }
    }

    override fun onDestroy() {
        mainHandler.removeCallbacksAndMessages(null)
        progressAnimator?.cancel()
        progressAnimator = null
        loadingOverlay.animate().cancel()
        loadingTipText.animate().cancel()
        webView.removeJavascriptInterface(JS_BRIDGE_NAME)
        webView.stopLoading()
        webView.destroy()
        super.onDestroy()
    }

    companion object {
        private const val LOG_TAG = "EldermereWeb"
        private const val JS_BRIDGE_NAME = "EldermereAndroid"
        private const val TIP_CYCLE_INTERVAL_MS = 1600L
    }
}
