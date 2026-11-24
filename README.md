# Chronicles

A collection of Chronicles strategy games.

## Repository Structure

```text
Chronicles
└── Eldermere
    ├── web/      # Chronicles of Eldermere — Three.js + TypeScript web client
    └── android/  # Chronicles of Eldermere — Kotlin + Gradle Android app
```

## Chronicles of Eldermere (Web)

- **Play live:** https://www.taylorlehman.com/chronicles/eldermere
- **Source:** [`Eldermere/web/`](./Eldermere/web/)

```bash
cd Eldermere/web
npm install
npm run dev
```

## Chronicles of Eldermere (Android)

- **Application ID:** `com.taylorlehman.chronicles.eldermere` (`minSdk 26`, `targetSdk 35`)
- **Source:** [`Eldermere/android/`](./Eldermere/android/)
- Offline-bundled Three.js 3D game via `WebViewAssetLoader` (`https://appassets.androidplatform.net/`), native Android 12+ SplashScreen & full-bleed Launch Loading Screen, edge-to-edge safe-area HUD insets, haptics bridge, and hierarchical native Back navigation.

```bash
cd Eldermere/android
./sync-web.sh
./gradlew assembleDebug
```

Install onto a connected device or emulator:

```bash
./gradlew installDebug
```
