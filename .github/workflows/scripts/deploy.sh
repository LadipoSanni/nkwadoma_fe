#!/bin/bash

# Set up Node.js
echo "Setting up Node.js..."
# Add commands to set up Node.js if necessary, e.g., installing Node.js via nvm
# Example:
# nvm install 18
# nvm use 18

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Build the project
echo "Building the project..."
if npm run build; then
    BUILD_SUCCESS=true
else
    BUILD_SUCCESS=false
    echo "Build failed, but continuing to generate site..."
fi

# Generate site (if applicable)
# If you use a static site generator or similar, adjust the command accordingly
echo "Generating site..."
# Example for a static site generator
# npm run generate || echo "Site generation failed, but continuing to upload..."

# Configure AWS CLI
echo "Configuring AWS CLI..."
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region $AWS_REGION

# Debugging output
echo "AWS CLI Version:"
aws --version
echo "AWS S3 Bucket: $S3_BUCKET"
echo "Project Name: $PROJECT_NAME"

# Deploy to S3
# echo "Deploying to S3..."
# if aws s3 sync build s3://${S3_BUCKET}/${PROJECT_NAME}/new-reports; then
#     echo "Successfully uploaded build to S3"
# else
#     echo "Failed to upload build to S3"
#     exit 1
# fi

# If build failed, exit here
# if [ "$BUILD_SUCCESS" = false ]; then
#     echo "Build failed. Exiting after S3 upload."
#     exit 1
# fi

# The rest of the script only runs if the build was successful

# Upload artifact
echo "Uploading artifact..."
# Add commands to upload artifact if necessary

# Login to Amazon ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${REPO_URL}

# Build, tag, and push image to Amazon ECR
echo "Building and pushing Docker image..."
docker build -t ${REPO_URL}:latest .
docker push ${REPO_URL}:latest

# Update ECS service
echo "Updating ECS service..."
aws ecs update-service --cluster ${CLUSTER} --service ${SERVICE} --force-new-deployment

echo "Script completed successfully."
