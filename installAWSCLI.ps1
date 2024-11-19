# Step 1: Download the AWS CLI MSI installer
Write-Host "Downloading AWS CLI Installer..."
$installerPath = "$env:TEMP\AWSCLIV2.msi"
Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile $installerPath

# Step 2: Install AWS CLI
Write-Host "Installing AWS CLI..."
Start-Process msiexec.exe -ArgumentList "/i "$installerPath" /quiet" -Wait

# Step 3: Verify Installation
Write-Host "Verifying AWS CLI Installation..."
$awsVersion = aws --version
if ($awsVersion) {
    Write-Host "AWS CLI installed successfully. Version: $awsVersion"
} else {
    Write-Error "AWS CLI installation failed."
    exit 1
}

# Step 4: Prompt user for Access Key and Secret Key
Write-Host "Configuring AWS CLI..."
$awsAccessKey = Read-Host "${AWS_ACCESS_KEY}"
$awsSecretKey = Read-Host "${AWS_SECRET_ACCESS_KEY}" -AsSecureString | ConvertFrom-SecureString

# Step 5: Configure AWS CLI
aws configure set aws_access_key_id $awsAccessKey
aws configure set aws_secret_access_key (ConvertTo-SecureString $awsSecretKey -AsPlainText)
Write-Host "AWS CLI configuration complete."

# Step 6: Clean up
Remove-Item $installerPath
Write-Host "Installer removed."

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 357586184453.dkr.ecr.us-east-1.amazonaws.com
