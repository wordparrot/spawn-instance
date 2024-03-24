"use strict";
exports.__esModule = true;
var setup =
  '#!/bin/bash\n\n    # Node.js Version: 18.x\n    # Script version: 0.0.1\n    # Last edit: 2022/11/18\n    # By: Alec Jones\n    \n    FORCE=$1\n    COMPLETION_FILE="wparrot_completed.txt"\n    COMPLETION_VAR="export WORDPARROT_COMPLETED_SETUP=true"\n    SPAWN_INSTANCE_FOLDER="spawn-instance"\n    ENV_FILE=".env"\n    SPAWN_INSTANCE_REPO="https://DowJones753@bitbucket.org/DowJones753/wordparrot-spawn-instance.git"\n    \n    echo \'Creating root wordparrot directory at /opt/wordparrot ...\'\n    \n    mkdir -p /opt/wordparrot && cd /opt/wordparrot\n    \n    echo \'Root directory created. Cloning build scripts...\'\n    \n    git clone $SPAWN_INSTANCE_REPO $SPAWN_INSTANCE_FOLDER\n    \n    if [ -e "$COMPLETION_FILE" ]; then\n        if [[ "$FORCE" == "--force" ]]; then\n            echo \'You have selected to force installation.\'\n        else\n            echo \'Completion file detected. You must add the --force parameter in order to proceed. Exiting.\'\n            exit 1\n        fi\n    fi\n    \n    if [ -x "$(command -v apt-get)" ]; then # Ubuntu/Debian\n        echo \'Linux distro: Debian/Ubuntu detected.\'\n        curl -fsSL https://deb.nodesource.com/setup_lts.xnode | sudo -E bash - &&        sudo apt install -y nodejs npm\n        sudo apt install -y docker.io docker-compose\n    else \n        echo "Failed to install node.js: Supported Linux package manager not found"\n        echo "Exiting."\n        exit 1\n    fi\n    \n    echo \'Node 18 installation complete.\'\n    \n    echo \'Generating and moving env files...\'\n    \n    cd ./$SPAWN_INSTANCE_FOLDER && npm install && npm run generate-env && cd ..\n    mv ./$SPAWN_INSTANCE_FOLDER/environment/.env ./\n    mv ./$SPAWN_INSTANCE_FOLDER/environment/.env.sandbox ./\n    mv ./$SPAWN_INSTANCE_FOLDER/environment/docker-compose.yml ./\n    mv ./$SPAWN_INSTANCE_FOLDER/environment/start.sh ./\n    mv ./$SPAWN_INSTANCE_FOLDER/package.json ./\n    \n    # Set start script permissions\n    chmod +x ./start.sh\n    \n    echo \'Env files generated. Deleting spawn instance repo.\'\n    \n    rm -rf ./$SPAWN_INSTANCE_FOLDER\n    \n    # Download required containers as specified on docker-compose.yml\n    docker-compose pull\n    \n    # Docker images pulled from Docker Hub.\n    echo "Images obtained from Docker Hub."\n    \n    # Write completion file. Must run script with --force flag if this file is detected later, otherwise script will end prematurely.\n    touch ./$COMPLETION_FILE\n    echo "# This file is created once wordparrot installation successfully completes." >> ./$COMPLETION_FILE\n    echo "# You don\'t need to put anything here." >> ./$COMPLETION_FILE\n    \n    # Also set WORDPARROT_SETUP_COMPLETE=true to the $PATH\n    echo " " >> ~/.profile\n    echo "# Mark Wordparrot installation complete here" >> ~/.profile\n    echo "$COMPLETION_VAR" >> ~/.profile\n    . ~/.profile\n    \n    # Docker images pulled from Docker Hub.\n    echo "Now booting up application. Please wait a few minutes for dependencies to install."\n    \n    # Run start script from package.json\n    bash ./start.sh\n';
exports["default"] = setup;
