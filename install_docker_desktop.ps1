# Enable script execution (if not already enabled)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# Variables
$DockerInstallerUrl = "https://desktop.docker.com/win/stable/Docker Desktop Installer.exe"
$InstallerPath = "$env:TEMP\DockerDesktopInstaller.exe"

Write-Host "Downloading Docker Desktop installer..." -ForegroundColor Green
Invoke-WebRequest -Uri $DockerInstallerUrl -OutFile $InstallerPath -UseBasicParsing

Write-Host "Starting Docker Desktop installation..." -ForegroundColor Green
Start-Process -FilePath $InstallerPath -ArgumentList "/quiet" -Wait

# Clean up installer file
Remove-Item $InstallerPath -Force

Write-Host "Docker Desktop installation complete. Please restart your computer if prompted." -ForegroundColor Green
