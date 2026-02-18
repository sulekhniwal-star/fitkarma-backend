$PB_VERSION = "0.22.6"
$PB_DIR = Join-Path $PSScriptRoot "..\pocketbase"

if (!(Test-Path $PB_DIR)) {
    New-Item -ItemType Directory -Path $PB_DIR
}

$ZIP_FILE = "pocketbase_$($PB_VERSION)_windows_amd64.zip"
$DOWNLOAD_URL = "https://github.com/pocketbase/pocketbase/releases/download/v$($PB_VERSION)/$ZIP_FILE"
$ZIP_PATH = Join-Path $PB_DIR "pocketbase.zip"

Write-Host "Downloading PocketBase v$PB_VERSION for Windows..."
Invoke-WebRequest -Uri $DOWNLOAD_URL -OutFile $ZIP_PATH

Write-Host "Extracting PocketBase..."
Expand-Archive -Path $ZIP_PATH -DestinationPath $PB_DIR -Force
Remove-Item $ZIP_PATH

Write-Host "PocketBase setup complete in $PB_DIR"
Write-Host "To start the server locally, run: & `"$PB_DIR\pocketbase.exe`" serve"
