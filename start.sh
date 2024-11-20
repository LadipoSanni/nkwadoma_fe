#!/bin/bash



AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
AWS_REGION=${3:-us-east-1} # Default to us-east-1 if no region is provided

# Step 1: Update and install required packages
echo "Updating package lists..."
sudo apt update -y

echo "Installing prerequisites..."
sudo apt install -y curl unzip

# Step 2: Download and install the AWS CLI
echo "Downloading AWS CLI installer..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

echo "Unzipping installer..."
unzip awscliv2.zip

echo "Installing AWS CLI..."
sudo ./aws/install

# Check installation
if ! command -v aws &> /dev/null; then
    echo "AWS CLI installation failed!"
    exit 1
fi

echo "AWS CLI successfully installed!"

# Step 3: Configure AWS CLI
echo "Configuring AWS CLI..."
aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
aws configure set region "$AWS_REGION"

echo "AWS CLI configured successfully!"

# Clean up
echo "Cleaning up installation files..."
rm -rf awscliv2.zip aws

# Verify installation and configuration
echo "Verifying AWS CLI version and configuration..."
aws --version
aws configure list

echo "Installation and configuration complete!"




# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 357586184453.dkr.ecr.us-east-1.amazonaws.com


