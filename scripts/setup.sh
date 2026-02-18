#!/bin/bash

# Configuration
PB_VERSION="0.22.6"
PB_DIR="../pocketbase"

# Create pocketbase directory if it doesn't exist
mkdir -p "$PB_DIR"

# Detect OS
OS="linux"
ARCH="amd64"
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    OS="windows"
    ZIP_EXT=".zip"
else
    ZIP_EXT=".zip"
fi

ZIP_FILE="pocketbase_${PB_VERSION}_${OS}_${ARCH}${ZIP_EXT}"
DOWNLOAD_URL="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/${ZIP_FILE}"

echo "Downloading PocketBase v${PB_VERSION} for ${OS}_${ARCH}..."
curl -L "$DOWNLOAD_URL" -o "$PB_DIR/pocketbase.zip"

echo "Extracting PocketBase..."
unzip -o "$PB_DIR/pocketbase.zip" -d "$PB_DIR"
rm "$PB_DIR/pocketbase.zip"

echo "PocketBase setup complete in $PB_DIR"
echo "To start the server locally, run: $PB_DIR/pocketbase serve"
