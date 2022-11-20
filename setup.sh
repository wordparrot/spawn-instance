#!/bin/bash

# Node.js Version: 18.x
# Script version: 0.0.1
# Last edit: 2022/11/18
# By: Alec Jones

DOMAIN_NAME=$1
FORCE=$2
COMPLETION_FILE="wparrot_completed.txt"
SPAWN_INSTANCE_FOLDER="spawn-instance"
ENV_FILE=".env"

# if [ -z "$domain_name" ]; then
#     if [[ "$PARAM" == "--force" ]]; then
#         $FORCE='--force'
#         PARAM=$1
#         OPTION=$2
#     else
#         OPTION=$1
#     fi
# fi

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

if [ -x "$(command -v apk)" ]; then # Alpine Linux
    echo 'Alpine Linux detected...'
    apk add nodejs npm
elif [ -x "$(command -v apt-get)" ]; then # Ubuntu/Debian
    echo 'Ubuntu/Debian detected...'
    curl -fsSL https://deb.nodesource.com/setup_lts.xnode | sudo -E bash - &&\
    sudo apt-get install -y nodejs
elif [ -x "$(command -v dnf)" ]; then # CentOS/Redhat/Rocky
    echo 'Redhat/CentOS detected...'
    dnf module install nodejs:18
elif [ -x "$(command -v zypper)" ]; then # openSUSE
    echo 'openSUSE detected...'
    zypper install nodejs14
elif [ -x "$(command -v pkg_add)" ]; then # OpenBSD
    echo 'OpenBSD detected...'
    pkg_add node
else 
    echo "Failed to install node.js: Supported Linux package manager not found"
    echo "Exiting."
    exit 1
fi

echo 'Node 18 installation complete.'

echo 'Generating env files...'

cd ./$SPAWN_INSTANCE_FOLDER && npm run generate-env && cd .. && mv ./$SPAWN_INSTANCE_FOLDER/scripts/* ./ && mv ./$SPAWN_INSTANCE_FOLDER/package.json ./

echo 'Deleting spawn instance repo...'

rm -rf ./$SPAWN_INSTANCE_FOLDER

# Add domain name to .env file, pass into the sites container's authorized_domains 
# Use authorized_domains/domains.txt to retrieve a SSL Cert by Let's Encrypt
echo "AUTHORIZED_DOMAIN=$DOMAIN_NAME" >> $ENV_FILE

# Download required containers as specified on docker-compose.yml
docker-compose pull

# Write completion file. Must run script with --force flag if this file is detected later, otherwise script will end prematurely.
touch $COMPLETION_FILE

# Run start script from package.json
chmod +x ./start.sh
./start.sh
