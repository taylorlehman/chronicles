# Keep @JavascriptInterface methods exposed to the Eldermere WebView
-keepclassmembers class com.taylorlehman.chronicles.eldermere.EldermereJsBridge {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes *Annotation*
