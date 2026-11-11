<#
  一键发布：提交本地改动并推送到 GitHub Pages 仓库。
  用法：
    powershell -ExecutionPolicy Bypass -File .\publish.ps1
    powershell -ExecutionPolicy Bypass -File .\publish.ps1 -Message "更新学习计划"
  第一次使用前，确保本机 Git 已登录过 GitHub（凭据管理器会记住账号）。
#>
param(
    [string]$Message = "更新个人主页"
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSCommandPath
Set-Location $repo

function Find-Git {
    $cmd = Get-Command git -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    $candidates = @(
        "C:\Program Files\Git\cmd\git.exe",
        "C:\Program Files (x86)\Git\cmd\git.exe",
        "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
        "D:\学习\node workbuddy\新建文件夹\Git\cmd\git.exe"
    )
    foreach ($path in $candidates) {
        if (Test-Path $path) { return $path }
    }
    throw "没有找到 git.exe，请先安装 Git：https://git-scm.com/download/win"
}

$git = Find-Git
Write-Host "使用 Git：$git" -ForegroundColor DarkGray
Write-Host "仓库目录：$repo" -ForegroundColor DarkGray

& $git add -A
$pending = & $git status --porcelain
if ($pending) {
    & $git commit -m $Message
    Write-Host "已提交改动：$Message" -ForegroundColor Green
} else {
    Write-Host "没有新的改动，继续推送当前提交。" -ForegroundColor Yellow
}

function Push-Remote {
    param([string[]]$ExtraArgs)
    & $git @ExtraArgs push origin main
    return $LASTEXITCODE
}

$code = Push-Remote -ExtraArgs @()
if ($code -ne 0) {
    Write-Host "常规推送失败，尝试兼容模式（OpenSSL 后端 + 跳过证书校验）……" -ForegroundColor Yellow
    $code = Push-Remote -ExtraArgs @('-c', 'http.sslBackend=openssl', '-c', 'http.sslVerify=false')
}

if ($code -ne 0) {
    Write-Host ""
    Write-Host "推送失败。常见原因：" -ForegroundColor Red
    Write-Host "  1. 本机没有登录 GitHub：执行 git config --global credential.helper manager，再重试并登录；"
    Write-Host "  2. 网络无法访问 github.com：先打开代理/加速器再重试；"
    Write-Host "  3. 账号没有该仓库权限：仓库名为 JACKT5418818845.github.io。"
    exit 1
}

Write-Host ""
Write-Host "推送完成，GitHub Pages 会在 1–2 分钟内自动更新：" -ForegroundColor Green
Write-Host "  https://jackt5418818845.github.io/" -ForegroundColor Cyan
Write-Host "加 Ctrl + F5 强制刷新，避免看到浏览器缓存的旧版本。"
