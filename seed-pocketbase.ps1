# ================================================================
# PAGE STUDIO — PocketBase 초기 데이터 시드 스크립트
# prices.json + site.json 데이터를 PocketBase에 자동 등록
# ================================================================
# [설정] NAS IP와 관리자 계정을 입력하세요.
# ================================================================

$PB_URL  = "http://192.168.219.47:8090"
$EMAIL   = "u.ant.9608@gmail.com"
$PASS    = "Pagestudio01064634201@@"

$PROJECT = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "PocketBase 데이터 시드 시작..." -ForegroundColor Cyan

# ── 1) 관리자 인증 ─────────────────────────────────────────────
$authBody = @{ identity = $EMAIL; password = $PASS } | ConvertTo-Json
try {
    $auth = Invoke-RestMethod -Uri "$PB_URL/api/collections/_superusers/auth-with-password" `
        -Method POST -Body $authBody -ContentType "application/json"
    $token = $auth.token
    Write-Host "  인증 완료" -ForegroundColor Green
} catch {
    Write-Host "  인증 실패: $_" -ForegroundColor Red
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

# ── 2) 가격 데이터 시드 ────────────────────────────────────────
Write-Host "  가격 데이터 등록 중..." -ForegroundColor Yellow
$prices = [System.IO.File]::ReadAllText("$PROJECT\data\prices.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
foreach ($p in $prices) {
    $body = @{
        name       = $p.name
        price      = $p.price
        duration   = $p.duration
        retouched  = $p.retouched
        delivery   = $p.delivery
        includes   = ($p.includes | ConvertTo-Json -Compress)
        featured   = [bool]$p.featured
        sort_order = [int]$p.order
    } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "$PB_URL/api/collections/prices/records" `
            -Method POST -Body $body -ContentType "application/json" -Headers $headers | Out-Null
        Write-Host "    '$($p.name)' 등록됨" -ForegroundColor Green
    } catch {
        Write-Host "    '$($p.name)' 실패: $_" -ForegroundColor Red
    }
}

# ── 3) FAQ 데이터 시드 ─────────────────────────────────────────
Write-Host "  FAQ 데이터 등록 중..." -ForegroundColor Yellow
$site = [System.IO.File]::ReadAllText("$PROJECT\data\site.json", [System.Text.Encoding]::UTF8) | ConvertFrom-Json
$i = 1
foreach ($f in $site.faq) {
    $body = @{
        question   = $f.q
        answer     = $f.a
        sort_order = $i
    } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "$PB_URL/api/collections/faq/records" `
            -Method POST -Body $body -ContentType "application/json" -Headers $headers | Out-Null
        Write-Host "    FAQ $i 등록됨" -ForegroundColor Green
        $i++
    } catch {
        Write-Host "    FAQ $i 실패: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "시드 완료!" -ForegroundColor Cyan
Write-Host "PocketBase 대시보드에서 확인: $PB_URL/_/" -ForegroundColor Gray
