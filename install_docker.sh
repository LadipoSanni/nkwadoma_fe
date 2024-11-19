#!/bin/bash

# Define colors for better visibility
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting the installation of Docker and Docker Compose...${NC}"

# Update and upgrade the package manager
echo -e "${GREEN}Updating the package manager...${NC}"
sudo apt-get update && sudo apt-get upgrade -y

# Install required dependencies
echo -e "${GREEN}Installing required dependencies...${NC}"
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
echo -e "${GREEN}Adding Docker's official GPG key...${NC}"
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the Docker repository
echo -e "${GREEN}Setting up the Docker repository...${NC}"
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
echo -e "${GREEN}Installing Docker Engine...${NC}"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify Docker installation
if [ $(sudo docker --version | grep -c 'Docker version') -gt 0 ]; then
    echo -e "${GREEN}Docker installed successfully!${NC}"
else
    echo -e "${RED}Docker installation failed.${NC}" >&2
    exit 1
fi

# Install Docker Compose
echo -e "${GREEN}Installing Docker Compose...${NC}"
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker Compose installation
if [ $(docker-compose --version | grep -c 'docker-compose version') -gt 0 ]; then
    echo -e "${GREEN}Docker Compose installed successfully!${NC}"
else
    echo -e "${RED}Docker Compose installation failed.${NC}" >&2
    exit 1
fi

# Enable and start the Docker service
echo -e "${GREEN}Enabling and starting the Docker service...${NC}"
sudo systemctl enable docker
sudo systemctl start docker

echo -e "${GREEN}Installation completed!${NC}"
echo -e "${GREEN}Docker version: $(docker --version)${NC}"
echo -e "${GREEN}Docker Compose version: $(docker-compose --version)${NC}"
