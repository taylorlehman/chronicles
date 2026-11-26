export type AndroidHapticStyle = 'tap' | 'select' | 'combat' | 'capture' | 'victory';

export interface EldermereAndroidBridge {
  onGameReady?: () => void;
  haptic?: (style: AndroidHapticStyle) => void;
  resetAppStateAndExit?: () => void;
}

declare global {
  interface Window {
    EldermereAndroid?: EldermereAndroidBridge;
    __eldermereHandleBack?: () => boolean;
    __eldermereSetPaused?: (paused: boolean) => void;
  }
}

let gameReadyNotified = false;

/**
 * Tag the document root when running inside the native Android WebView so CSS can apply
 * Android WebView compositor workarounds (e.g. avoiding backdrop-filter tile bleed over WebGL)
 * without altering desktop/mobile browser styling.
 */
if (typeof window !== 'undefined' && typeof document !== 'undefined' && window.EldermereAndroid) {
  document.documentElement.classList.add('android-webview');
}

export function notifyAndroidGameReady(): void {
  if (gameReadyNotified || typeof window === 'undefined') return;
  gameReadyNotified = true;
  try {
    window.EldermereAndroid?.onGameReady?.();
  } catch {
    // Ignore bridge failures when running outside Android WebView
  }
}

export function isAndroidApp(): boolean {
  return typeof window !== 'undefined' && Boolean(window.EldermereAndroid);
}

export function triggerAndroidHaptic(style: AndroidHapticStyle): void {
  if (typeof window === 'undefined') return;
  try {
    window.EldermereAndroid?.haptic?.(style);
  } catch {
    // Ignore bridge failures when running outside Android WebView
  }
}

export function requestAndroidStateResetAndExit(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (typeof window.EldermereAndroid?.resetAppStateAndExit === 'function') {
      window.EldermereAndroid.resetAppStateAndExit();
      return true;
    }
  } catch {
    // Ignore bridge failures when running outside Android WebView
  }
  return false;
}
