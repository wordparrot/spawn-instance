#!/bin/bash

# Node.js Version: 18.x
# Script version: 0.0.1
# Last edit: 2022/11/18
# By: Alec Jones

DOMAIN_NAME=$1
FORCE=$2
COMPLETION_FILE="wparrot_completed.txt"
COMPLETION_VAR="export WORDPARROT_COMPLETED_SETUP=true"
SPAWN_INSTANCE_FOLDER="spawn-instance"
ENV_FILE=".env"

if [ -e "$COMPLETION_FILE" ]; then
    if [[ "$FORCE" == "--force" ]]; then
        echo 'You have selected to force installation.'
    else
        echo 'Completion file detected. You must add the --force parameter in order to proceed. Exiting.'
        exit 1
    fi
fi

if [ -z "$DOMAIN_NAME" ]; then
    echo 'Script requires domain name as first argument. Please enter default domain name.'
    echo 'Exiting.'
    exit 1
fi

if [[ "$DOMAIN_NAME" =~ ^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$ ]]; then
    # nothing, domain name matches regex
    echo 'Entered domain name valid.'
else
    echo 'Domain name is not valid format. Please enter valid domain name.'
    exit 1
fi

if [ -x "$(command -v apt-get)" ]; then # Ubuntu/Debian
    echo 'Linux distro: Debian/Ubuntu detected.'
    curl -fsSL https://deb.nodesource.com/setup_lts.xnode | sudo -E bash - &&\
    sudo apt-get install -y nodejs
    sudo apt install -y docker.io docker-compose
else 
    echo "Failed to install node.js: Supported Linux package manager not found"
    echo "Exiting."
    exit 1
fi

echo 'Node 18 installation complete.'

echo 'Generating env files...'

cd ./$SPAWN_INSTANCE_FOLDER && npm run generate-env && cd ..
mv ./$SPAWN_INSTANCE_FOLDER/scripts/.env ./
mv ./$SPAWN_INSTANCE_FOLDER/scripts/.env.sandbox ./
mv ./$SPAWN_INSTANCE_FOLDER/scripts/docker-compose.yml ./
mv ./$SPAWN_INSTANCE_FOLDER/package.json ./

# Set start script permissions
chmod +x ./start.sh

echo 'Env files generated. Deleting spawn instance repo.'

rm -rf ./$SPAWN_INSTANCE_FOLDER

# Add domain name to .env file, pass into the sites container's authorized_domains 
# Use authorized_domains/domains.txt to retrieve a SSL Cert by Let's Encrypt
echo "AUTHORIZED_DOMAIN=$DOMAIN_NAME" >> $ENV_FILE

# Download required containers as specified on docker-compose.yml
docker-compose pull

# Docker images pulled from Docker Hub.
echo "Images obtained from Docker Hub."

# Write completion file. Must run script with --force flag if this file is detected later, otherwise script will end prematurely.
touch ./$COMPLETION_FILE
echo "# This file is created once wordparrot installation successfully completes." >> ./$COMPLETION_FILE
echo "# You don't need to put anything here." >> ./$COMPLETION_FILE

# Also set WORDPARROT_SETUP_COMPLETE=true to the $PATH
echo " " >> ~/.profile
echo "# Mark Wordparrot installation complete here" >> ~/.profile
echo "$COMPLETION_VAR" >> ~/.profile
source ~/.profile

# Docker images pulled from Docker Hub.
echo "Now booting up application. Please wait a few minutes for dependencies to install."

# Run start script from package.json
./start.sh
