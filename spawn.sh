#!/bin/bash

# Node.js Version: 18.x
# Spawn version: 1.0.0
# Last edit: 2022/11/18
# By: Alec Jones

DOMAIN_NAME=$1
SPAWN_INSTANCE_REPO="https://DowJones753@bitbucket.org/DowJones753/wordparrot-spawn-instance.git"
WORDPARROT_ROOT = "/opt/wordparrot"
SPAWN_INSTANCE_FOLDER="spawn-instance"
SETUP_SCRIPT="setup.sh"

echo 'Creating root wordparrot directory at /opt/wordparrot ...'

mkdir $WORDPARROT_ROOT

cd $WORDPARROT_ROOT

git clone $SPAWN_INSTANCE_REPO $SPAWN_INSTANCE_FOLDER

echo 'Root directory created. Cloning build scripts...'

git clone $SPAWN_INSTANCE_REPO $SPAWN_INSTANCE_FOLDER

chmod +x ./$SPAWN_INSTANCE_FOLDER/$SETUP_SCRIPT && ./$SPAWN_INSTANCE_FOLDER/$SETUP_SCRIPT $DOMAIN_NAME