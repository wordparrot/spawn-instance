const setup = `#!/bin/bash

    # Node.js Version: 18.x
    # Script version: 0.0.1
    # Last edit: 2022/11/18
    # By: Alec Jones
    
    FORCE=$1
    COMPLETION_FILE="wparrot_completed.txt"
    COMPLETION_VAR="export WORDPARROT_COMPLETED_SETUP=true"
    SPAWN_INSTANCE_FOLDER="spawn-instance"
    ENV_FILE=".env"
    SPAWN_INSTANCE_REPO="https://DowJones753@bitbucket.org/DowJones753/wordparrot-spawn-instance.git"
    
    echo 'Creating root wordparrot directory at /opt/wordparrot ...'
    
    mkdir -p /opt/wordparrot && cd /opt/wordparrot
    
    echo 'Root directory created. Cloning build scripts...'
    
    git clone $SPAWN_INSTANCE_REPO $SPAWN_INSTANCE_FOLDER
    
    if [ -e "$COMPLETION_FILE" ]; then
        if [[ "$FORCE" == "--force" ]]; then
            echo 'You have selected to force installation.'
        else
            echo 'Completion file detected. You must add the --force parameter in order to proceed. Exiting.'
            exit 1
        fi
    fi
    
    if [ -x "$(command -v apt-get)" ]; then # Ubuntu/Debian
        echo 'Linux distro: Debian/Ubuntu detected.'
        curl -fsSL https://deb.nodesource.com/setup_lts.xnode | sudo -E bash - &&\
        sudo apt install -y nodejs npm
        sudo apt install -y docker.io docker-compose
    else 
        echo "Failed to install node.js: Supported Linux package manager not found"
        echo "Exiting."
        exit 1
    fi
    
    echo 'Node 18 installation complete.'
    
    echo 'Generating and moving env files...'
    
    cd ./$SPAWN_INSTANCE_FOLDER && npm install && npm run generate-env && cd ..
    mv ./$SPAWN_INSTANCE_FOLDER/environment/.env ./
    mv ./$SPAWN_INSTANCE_FOLDER/environment/.env.sandbox ./
    mv ./$SPAWN_INSTANCE_FOLDER/environment/docker-compose.yml ./
    mv ./$SPAWN_INSTANCE_FOLDER/environment/start.sh ./
    mv ./$SPAWN_INSTANCE_FOLDER/package.json ./
    
    # Set start script permissions
    chmod +x ./start.sh
    
    echo 'Env files generated. Deleting spawn instance repo.'
    
    rm -rf ./$SPAWN_INSTANCE_FOLDER
    
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
    . ~/.profile
    
    # Docker images pulled from Docker Hub.
    echo "Now booting up application. Please wait a few minutes for dependencies to install."
    
    # Run start script from package.json
    ./start.sh
`;

export default setup;
