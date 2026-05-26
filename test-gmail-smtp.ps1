# test-gmail-smtp.ps1
# Test Gmail SMTP credential sebelum push ke Vercel

$gmailUser = "ootdproject123@gmail.com"
$appPassword = "xvriwgsuznwjzblx"
$recipientEmail = "ootdproject123@gmail.com"  # kirim ke diri sendiri buat test

# Build credential
$securePassword = ConvertTo-SecureString $appPassword -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($gmailUser, $securePassword)

# Send via Send-MailMessage (built-in PowerShell, pake SMTP)
try {
    Send-MailMessage `
        -From "OOTD Project <$gmailUser>" `
        -To $recipientEmail `
        -Subject "Test SMTP - OOTD Project" `
        -Body "<h1>Test berhasil!</h1><p>Kalo lo baca ini, Gmail SMTP udah jalan.</p>" `
        -BodyAsHtml `
        -SmtpServer "smtp.gmail.com" `
        -Port 587 `
        -UseSsl `
        -Credential $credential `
        -ErrorAction Stop

    Write-Host "✅ SUKSES! Cek inbox $recipientEmail" -ForegroundColor Green
} catch {
    Write-Host "❌ GAGAL: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Cek: App Password bener? 2FA aktif? Akun ga di-suspend?" -ForegroundColor Yellow
}