#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_DIR="$(cd "${SCRIPT_DIR}/../web" && pwd)"
ASSETS_WWW_DIR="${SCRIPT_DIR}/app/src/main/assets/www"

echo "[sync-web] Building Eldermere/web with VITE_BASE=/assets/www/ ..."
(
  cd "${WEB_DIR}"
  VITE_BASE=/assets/www/ npm run build
)

echo "[sync-web] Syncing dist/ -> ${ASSETS_WWW_DIR} (excluding source maps) ..."
rm -rf "${ASSETS_WWW_DIR}"
mkdir -p "${ASSETS_WWW_DIR}"
rsync -a --exclude='*.map' "${WEB_DIR}/dist/" "${ASSETS_WWW_DIR}/"

FILE_COUNT=$(find "${ASSETS_WWW_DIR}" -type f | wc -l | tr -d ' ')
echo "[sync-web] Synced ${FILE_COUNT} files into ${ASSETS_WWW_DIR}"
