[CmdletBinding()]
param(
    [string]$Distro = 'Ubuntu',
    [string]$ProjectPath = $PSScriptRoot
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command wsl.exe -ErrorAction SilentlyContinue)) {
    throw 'WSL2 is not installed or wsl.exe is not available on PATH.'
}

$resolvedProjectPath = (Resolve-Path -LiteralPath $ProjectPath).Path
$windowsProjectPath = $resolvedProjectPath -replace '\\', '/'
$wslProjectPath = (& wsl.exe --distribution $Distro -- wslpath -a $windowsProjectPath).Trim()

if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($wslProjectPath)) {
    throw "Could not convert '$resolvedProjectPath' to a WSL path for distro '$Distro'."
}

$escapedWslPath = $wslProjectPath -replace "'", "'\''"
$bashCommand = @"
cd '$escapedWslPath' || exit 1
if ! command -v devbox >/dev/null 2>&1; then
    echo 'Devbox is not installed in this WSL distribution.'
    echo 'Install it with: curl -fsSL https://get.jetify.com/devbox | bash'
    exec bash
fi
exec devbox shell
"@ -replace "`r`n?", "`n"

& wsl.exe --distribution $Distro --cd $resolvedProjectPath -- bash -lc $bashCommand
exit $LASTEXITCODE
