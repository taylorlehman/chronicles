package com.taylorlehman.chronicles.eldermere

import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.content.res.Configuration
import android.graphics.Color
import android.graphics.SurfaceTexture
import android.media.AudioAttributes
import android.media.AudioManager
import android.media.MediaPlayer
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.util.Log
import android.view.HapticFeedbackConstants
import android.view.Surface
import android.view.TextureView
import android.view.View
import android.view.animation.DecelerateInterpolator
import android.webkit.ConsoleMessage
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebStorage
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.ImageButton
import android.widget.ImageView
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
    private lateinit var sizzleOverlay: FrameLayout
    private lateinit var sizzleTextureView: TextureView
    private lateinit var sizzleControlsContainer: LinearLayout
    private lateinit var sizzleMuteButton: ImageButton
    private lateinit var sizzleSkipButton: TextView
    private lateinit var loadingOverlay: FrameLayout
    private lateinit var loadingBgImage: ImageView
    private lateinit var loadingHeader: LinearLayout
    private lateinit var loadingFooter: LinearLayout
    private lateinit var loadingTipText: TextView
    private lateinit var loadingProgressBar: ProgressBar
    private lateinit var stateClearedOverlay: FrameLayout

    private lateinit var assetLoader: WebViewAssetLoader
    private lateinit var sizzleStore: SharedPreferencesSizzleStore
    private lateinit var sizzleStateMachine: SizzleIntroStateMachine
    private val mainHandler = Handler(Looper.getMainLooper())

    private var launchElapsedMs: Long = 0L
    private var isPageLoaded: Boolean = false
    private var isOverlayDismissed: Boolean = false
    private var isActivityResumed: Boolean = false
    private var isResettingAppState: Boolean = false
    private var pendingSizzleFinishedNotification: Boolean = false
    private var hasNotifiedSizzleFinished: Boolean = false
    private var latestSafeInsets: SafeAreaInsets = SafeAreaInsets.ZERO
    private var progressAnimator: ValueAnimator? = null
    private var tipIndex: Int = 0
    private var loadingTips: Array<String> = emptyArray()

    private var sizzleMediaPlayer: MediaPlayer? = null
    private var sizzleSurface: Surface? = null
    private var sizzleVideoWidth: Int = 0
    private var sizzleVideoHeight: Int = 0
    private var sizzleResumePositionMs: Int = 0

    private val fallbackDismissRunnable = Runnable {
        Log.w(LOG_TAG, "Loading overlay fallback timeout reached (${SplashDismissPolicy.MAX_SPLASH_TIMEOUT_MS}ms); dismissing overlay")
        dismissLoadingOverlay()
    }

    private val sizzlePrepareTimeoutRunnable = Runnable {
        Log.w(LOG_TAG, "Sizzle video prepare timeout reached (${SizzleIntroStateMachine.PREPARE_TIMEOUT_MS}ms); falling back to game menu")
        handleSizzleAction(sizzleStateMachine.onPlaybackErrorOrTimeout())
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

        volumeControlStream = AudioManager.STREAM_MUSIC
        launchElapsedMs = SystemClock.elapsedRealtime()
        setContentView(R.layout.activity_main)

        rootContainer = findViewById(R.id.root_container)
        webView = findViewById(R.id.game_webview)
        sizzleOverlay = findViewById(R.id.sizzle_overlay)
        sizzleTextureView = findViewById(R.id.sizzle_texture_view)
        sizzleControlsContainer = findViewById(R.id.sizzle_controls_container)
        sizzleMuteButton = findViewById(R.id.sizzle_mute_button)
        sizzleSkipButton = findViewById(R.id.sizzle_skip_button)
        loadingOverlay = findViewById(R.id.loading_overlay)
        loadingBgImage = findViewById(R.id.loading_bg_image)
        loadingHeader = findViewById(R.id.loading_header)
        loadingFooter = findViewById(R.id.loading_footer)
        loadingTipText = findViewById(R.id.loading_tip_text)
        loadingProgressBar = findViewById(R.id.loading_progress_bar)
        stateClearedOverlay = findViewById(R.id.state_cleared_overlay)
        loadingTips = resources.getStringArray(R.array.loading_tips)

        sizzleStore = SharedPreferencesSizzleStore(this)
        sizzleStateMachine = SizzleIntroStateMachine(sizzleStore)

        assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        setupWindowInsets()
        setupSizzleOverlay()
        setupLoadingOverlayAnimation()
        setupWebView()
        setupBackNavigation()

        mainHandler.postDelayed(fallbackDismissRunnable, SplashDismissPolicy.MAX_SPLASH_TIMEOUT_MS)
        webView.loadUrl(WebOriginPolicy.ENTRY_URL)
    }

    private fun setupWindowInsets() {
        val baseHeaderTopPadding = loadingHeader.paddingTop
        val baseHeaderLeftPadding = loadingHeader.paddingLeft
        val baseHeaderRightPadding = loadingHeader.paddingRight
        val baseFooterBottomPadding = loadingFooter.paddingBottom
        val baseFooterLeftPadding = loadingFooter.paddingLeft
        val baseFooterRightPadding = loadingFooter.paddingRight
        val baseSizzleControlsTopPadding = sizzleControlsContainer.paddingTop
        val baseSizzleControlsLeftPadding = sizzleControlsContainer.paddingLeft
        val baseSizzleControlsRightPadding = sizzleControlsContainer.paddingRight

        ViewCompat.setOnApplyWindowInsetsListener(rootContainer) { _, windowInsets ->
            val bars = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout(),
            )
            loadingHeader.updatePadding(
                left = baseHeaderLeftPadding + bars.left,
                top = baseHeaderTopPadding + bars.top,
                right = baseHeaderRightPadding + bars.right,
            )
            loadingFooter.updatePadding(
                left = baseFooterLeftPadding + bars.left,
                right = baseFooterRightPadding + bars.right,
                bottom = baseFooterBottomPadding + bars.bottom,
            )
            sizzleControlsContainer.updatePadding(
                left = baseSizzleControlsLeftPadding + bars.left,
                top = baseSizzleControlsTopPadding + bars.top,
                right = baseSizzleControlsRightPadding + bars.right,
            )

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

    private fun setupSizzleOverlay() {
        if (!sizzleStateMachine.shouldPrepareSizzle) {
            sizzleOverlay.visibility = View.GONE
            return
        }

        // Keep sizzle overlay visible beneath the opaque loading overlay so TextureView
        // acquires its SurfaceTexture and MediaPlayer prepares asynchronously during boot.
        sizzleOverlay.visibility = View.VISIBLE
        sizzleOverlay.alpha = 1f
        updateMuteButtonUi(isMuted = sizzleStateMachine.isMuted)

        sizzleSkipButton.setOnClickListener {
            performHaptic(HapticStyle.TAP)
            handleSizzleAction(sizzleStateMachine.onSkipRequested())
        }

        sizzleMuteButton.setOnClickListener {
            performHaptic(HapticStyle.TAP)
            val muted = sizzleStateMachine.toggleMute()
            updateMuteButtonUi(isMuted = muted)
            sizzleMediaPlayer?.let { applySizzleVolume(it) }
        }

        sizzleTextureView.surfaceTextureListener = object : TextureView.SurfaceTextureListener {
            override fun onSurfaceTextureAvailable(
                surfaceTexture: SurfaceTexture,
                width: Int,
                height: Int,
            ) {
                attachSizzleSurface(surfaceTexture, width, height)
            }

            override fun onSurfaceTextureSizeChanged(
                surfaceTexture: SurfaceTexture,
                width: Int,
                height: Int,
            ) {
                applySizzleVideoTransform(width, height)
            }

            override fun onSurfaceTextureDestroyed(surfaceTexture: SurfaceTexture): Boolean {
                try {
                    sizzleMediaPlayer?.setSurface(null)
                } catch (t: Throwable) {
                    Log.w(LOG_TAG, "Ignored error detaching sizzle surface", t)
                }
                sizzleSurface?.release()
                sizzleSurface = null
                return true
            }

            override fun onSurfaceTextureUpdated(surfaceTexture: SurfaceTexture) = Unit
        }

        if (sizzleTextureView.isAvailable) {
            sizzleTextureView.surfaceTexture?.let { texture ->
                attachSizzleSurface(texture, sizzleTextureView.width, sizzleTextureView.height)
            }
        }
    }

    private fun attachSizzleSurface(surfaceTexture: SurfaceTexture, width: Int, height: Int) {
        if (isDestroyed) return
        sizzleSurface?.release()
        val surface = Surface(surfaceTexture)
        sizzleSurface = surface

        val existingPlayer = sizzleMediaPlayer
        if (existingPlayer != null) {
            try {
                existingPlayer.setSurface(surface)
                applySizzleVideoTransform(width, height)
            } catch (t: Throwable) {
                Log.e(LOG_TAG, "Failed to reattach sizzle video surface", t)
                handleSizzleAction(sizzleStateMachine.onPlaybackErrorOrTimeout())
            }
        } else if (sizzleStateMachine.shouldPrepareSizzle || sizzleStateMachine.isSizzleOverlayActive) {
            prepareSizzleMediaPlayer(surface)
        }
    }

    private fun prepareSizzleMediaPlayer(surface: Surface) {
        if (isDestroyed) return
        try {
            val isLandscape = resources.configuration.orientation == Configuration.ORIENTATION_LANDSCAPE
            val sizzleResId = SizzleMediaSelector.selectRawResId(
                isLandscape = isLandscape,
                portraitResId = R.raw.eldermere_sizzle,
                landscapeResId = R.raw.eldermere_sizzle_land,
            )
            val afd = resources.openRawResourceFd(sizzleResId)
                ?: throw IllegalStateException("Missing raw resource $sizzleResId")
            val player = MediaPlayer()
            sizzleMediaPlayer = player
            player.setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_GAME)
                    .setContentType(AudioAttributes.CONTENT_TYPE_MOVIE)
                    .build(),
            )
            afd.use { descriptor ->
                player.setDataSource(
                    descriptor.fileDescriptor,
                    descriptor.startOffset,
                    descriptor.length,
                )
            }
            player.setSurface(surface)
            player.isLooping = false

            player.setOnVideoSizeChangedListener { mp, videoWidth, videoHeight ->
                if (sizzleMediaPlayer !== mp) return@setOnVideoSizeChangedListener
                sizzleVideoWidth = videoWidth
                sizzleVideoHeight = videoHeight
                applySizzleVideoTransform(sizzleTextureView.width, sizzleTextureView.height)
            }

            player.setOnPreparedListener { mp ->
                if (isDestroyed || sizzleMediaPlayer !== mp) return@setOnPreparedListener
                sizzleVideoWidth = mp.videoWidth
                sizzleVideoHeight = mp.videoHeight
                applySizzleVideoTransform(sizzleTextureView.width, sizzleTextureView.height)
                applySizzleVolume(mp)
                if (sizzleResumePositionMs > 0) {
                    try {
                        mp.seekTo(sizzleResumePositionMs)
                    } catch (t: Throwable) {
                        Log.w(LOG_TAG, "Unable to seek sizzle video to $sizzleResumePositionMs", t)
                    }
                }
                handleSizzleAction(sizzleStateMachine.onMediaPrepared(isActivityResumed))
            }

            player.setOnCompletionListener { mp ->
                if (sizzleMediaPlayer !== mp) return@setOnCompletionListener
                handleSizzleAction(sizzleStateMachine.onPlaybackCompleted())
            }

            player.setOnErrorListener { mp, what, extra ->
                Log.e(LOG_TAG, "Sizzle video playback error (what=$what, extra=$extra)")
                if (sizzleMediaPlayer === mp) {
                    handleSizzleAction(sizzleStateMachine.onPlaybackErrorOrTimeout())
                }
                true
            }

            player.prepareAsync()
        } catch (t: Throwable) {
            Log.e(LOG_TAG, "Failed to prepare sizzle video; falling back to Start Game menu", t)
            handleSizzleAction(sizzleStateMachine.onPlaybackErrorOrTimeout())
        }
    }

    private fun handleSizzleAction(action: SizzleAction) {
        when (action) {
            SizzleAction.NONE -> Unit
            SizzleAction.WAIT_FOR_PREPARE -> {
                mainHandler.removeCallbacks(sizzlePrepareTimeoutRunnable)
                mainHandler.postDelayed(
                    sizzlePrepareTimeoutRunnable,
                    SizzleIntroStateMachine.PREPARE_TIMEOUT_MS,
                )
                if (sizzleMediaPlayer == null && sizzleTextureView.isAvailable) {
                    sizzleTextureView.surfaceTexture?.let { texture ->
                        attachSizzleSurface(texture, sizzleTextureView.width, sizzleTextureView.height)
                    }
                }
            }
            SizzleAction.START_PLAYBACK, SizzleAction.RESUME_PLAYBACK -> {
                mainHandler.removeCallbacks(sizzlePrepareTimeoutRunnable)
                val player = sizzleMediaPlayer
                if (player == null) {
                    handleSizzleAction(sizzleStateMachine.onPlaybackErrorOrTimeout())
                    return
                }
                try {
                    applySizzleVolume(player)
                    applySizzleVideoTransform(sizzleTextureView.width, sizzleTextureView.height)
                    if (!player.isPlaying) {
                        player.start()
                    }
                } catch (t: Throwable) {
                    Log.e(LOG_TAG, "Failed to start sizzle playback", t)
                    handleSizzleAction(sizzleStateMachine.onPlaybackErrorOrTimeout())
                }
            }
            SizzleAction.PAUSE_PLAYBACK -> {
                mainHandler.removeCallbacks(sizzlePrepareTimeoutRunnable)
                val player = sizzleMediaPlayer ?: return
                try {
                    if (player.isPlaying) {
                        sizzleResumePositionMs = player.currentPosition
                        player.pause()
                    }
                } catch (t: Throwable) {
                    Log.w(LOG_TAG, "Ignored error pausing sizzle playback", t)
                }
            }
            SizzleAction.FINISH_AND_REVEAL_GAME -> {
                finishSizzleAndRevealGame()
            }
        }
    }

    private fun finishSizzleAndRevealGame() {
        mainHandler.removeCallbacks(sizzlePrepareTimeoutRunnable)
        sizzleMediaPlayer?.let { player ->
            try {
                player.setVolume(0f, 0f)
                if (player.isPlaying) {
                    player.pause()
                }
            } catch (t: Throwable) {
                Log.w(LOG_TAG, "Ignored error stopping sizzle playback during dismiss", t)
            }
        }

        sizzleOverlay.isClickable = false
        sizzleOverlay.isFocusable = false
        sizzleSkipButton.isEnabled = false
        sizzleMuteButton.isEnabled = false

        notifyWebViewSizzleFinished()

        if (!isOverlayDismissed || sizzleOverlay.visibility != View.VISIBLE) {
            sizzleOverlay.visibility = View.GONE
            releaseSizzleMediaPlayer()
            return
        }

        sizzleOverlay.animate()
            .alpha(0f)
            .setDuration(SizzleIntroStateMachine.FADE_OUT_DURATION_MS)
            .setInterpolator(DecelerateInterpolator())
            .withEndAction {
                sizzleOverlay.visibility = View.GONE
                sizzleOverlay.alpha = 1f
                releaseSizzleMediaPlayer()
            }
            .start()
    }

    private fun notifyWebViewSizzleFinished() {
        if (hasNotifiedSizzleFinished || isDestroyed) return
        if (!isPageLoaded) {
            pendingSizzleFinishedNotification = true
            return
        }
        hasNotifiedSizzleFinished = true
        pendingSizzleFinishedNotification = false
        webView.evaluateJavascript(
            "if(typeof window.__eldermereOnSizzleFinished==='function'){window.__eldermereOnSizzleFinished();}",
            null,
        )
    }

    private fun releaseSizzleMediaPlayer() {
        mainHandler.removeCallbacks(sizzlePrepareTimeoutRunnable)
        val player = sizzleMediaPlayer
        sizzleMediaPlayer = null
        if (player != null) {
            try {
                if (player.isPlaying) {
                    player.stop()
                }
            } catch (ignored: Throwable) {
            }
            try {
                player.setSurface(null)
            } catch (ignored: Throwable) {
            }
            try {
                player.reset()
            } catch (ignored: Throwable) {
            }
            try {
                player.release()
            } catch (ignored: Throwable) {
            }
        }
        sizzleSurface?.release()
        sizzleSurface = null
    }

    private fun applySizzleVolume(player: MediaPlayer) {
        val volume = if (sizzleStateMachine.isMuted) 0f else 1f
        try {
            player.setVolume(volume, volume)
        } catch (t: Throwable) {
            Log.w(LOG_TAG, "Ignored error applying sizzle volume", t)
        }
    }

    private fun updateMuteButtonUi(isMuted: Boolean) {
        sizzleMuteButton.setImageResource(
            if (isMuted) R.drawable.ic_sizzle_volume_off else R.drawable.ic_sizzle_volume_on,
        )
        sizzleMuteButton.contentDescription = getString(
            if (isMuted) R.string.sizzle_unmute_cd else R.string.sizzle_mute_cd,
        )
    }

    private fun applySizzleVideoTransform(viewWidth: Int, viewHeight: Int) {
        val isLandscapeViewport = if (viewWidth > 0 && viewHeight > 0) {
            viewWidth > viewHeight
        } else {
            resources.configuration.orientation == Configuration.ORIENTATION_LANDSCAPE
        }
        val transform = VideoViewportTransform.compute(
            viewWidth = viewWidth,
            viewHeight = viewHeight,
            videoWidth = sizzleVideoWidth,
            videoHeight = sizzleVideoHeight,
            isLandscapeViewport = isLandscapeViewport,
        )
        sizzleTextureView.setTransform(transform.toMatrix())
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
            onResetAppStateAndExitCallback = {
                mainHandler.post { handleSecretStateResetAndExit() }
            },
            shouldAutoStartTutorialProvider = {
                sizzleStateMachine.isFirstRunSession
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
                if (pendingSizzleFinishedNotification) {
                    notifyWebViewSizzleFinished()
                }
            }
        }
    }

    private fun setupBackNavigation() {
        onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    if (sizzleStateMachine.shouldHandleBackPress) {
                        performHaptic(HapticStyle.TAP)
                        handleSizzleAction(sizzleStateMachine.onSkipRequested())
                        return
                    }
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

        // Kick off first-run sizzle playback as the loading screen cross-fades out.
        handleSizzleAction(sizzleStateMachine.onLoadingOverlayDismissed(isActivityResumed))

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

    private fun handleSecretStateResetAndExit() {
        if (isResettingAppState || isFinishing || isDestroyed) return
        isResettingAppState = true
        Log.i(LOG_TAG, "Secret state reset triggered; clearing SharedPreferences and WebView storage")

        try {
            sizzleStore.clearAll()
        } catch (t: Throwable) {
            Log.w(LOG_TAG, "Error clearing SharedPreferences", t)
        }
        try {
            WebStorage.getInstance().deleteAllData()
        } catch (t: Throwable) {
            Log.w(LOG_TAG, "Error clearing WebStorage", t)
        }
        try {
            CookieManager.getInstance().removeAllCookies(null)
            CookieManager.getInstance().flush()
        } catch (t: Throwable) {
            Log.w(LOG_TAG, "Error clearing WebView cookies", t)
        }
        try {
            webView.clearCache(true)
            webView.clearHistory()
        } catch (t: Throwable) {
            Log.w(LOG_TAG, "Error clearing WebView cache", t)
        }

        stateClearedOverlay.animate().cancel()
        stateClearedOverlay.alpha = 0f
        stateClearedOverlay.visibility = View.VISIBLE
        stateClearedOverlay.animate()
            .alpha(1f)
            .setDuration(STATE_CLEARED_FADE_IN_MS)
            .setInterpolator(DecelerateInterpolator())
            .withEndAction {
                if (isFinishing || isDestroyed) return@withEndAction
                mainHandler.postDelayed(
                    {
                        if (isFinishing || isDestroyed) return@postDelayed
                        stateClearedOverlay.animate()
                            .alpha(0f)
                            .setDuration(STATE_CLEARED_FADE_OUT_MS)
                            .setInterpolator(DecelerateInterpolator())
                            .withEndAction {
                                if (!isFinishing && !isDestroyed) {
                                    finishAndRemoveTask()
                                }
                            }
                            .start()
                    },
                    STATE_CLEARED_HOLD_MS,
                )
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

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        if (!isOverlayDismissed) {
            loadingBgImage.setImageResource(R.drawable.splash_loading_bg)
        }
        if (sizzleTextureView.width > 0 && sizzleTextureView.height > 0) {
            applySizzleVideoTransform(sizzleTextureView.width, sizzleTextureView.height)
        }
        ViewCompat.requestApplyInsets(rootContainer)
    }

    override fun onPause() {
        isActivityResumed = false
        handleSizzleAction(sizzleStateMachine.onActivityPaused())
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
        isActivityResumed = true
        handleSizzleAction(sizzleStateMachine.onActivityResumed())
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
        sizzleOverlay.animate().cancel()
        stateClearedOverlay.animate().cancel()
        releaseSizzleMediaPlayer()
        webView.removeJavascriptInterface(JS_BRIDGE_NAME)
        webView.stopLoading()
        webView.destroy()
        super.onDestroy()
    }

    companion object {
        private const val LOG_TAG = "EldermereWeb"
        private const val JS_BRIDGE_NAME = "EldermereAndroid"
        private const val TIP_CYCLE_INTERVAL_MS = 1600L
        private const val STATE_CLEARED_FADE_IN_MS = 200L
        private const val STATE_CLEARED_HOLD_MS = 900L
        private const val STATE_CLEARED_FADE_OUT_MS = 1600L
    }
}
