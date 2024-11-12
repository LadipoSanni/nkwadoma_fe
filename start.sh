#!/bin/bash

# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 357586184453.dkr.ecr.us-east-1.amazonaws.com

# Run Docker Compose
docker-compose up
