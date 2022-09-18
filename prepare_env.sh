#!/bin/bash
repo_local=/home/ubuntu/reactauth0nodedocker
repo_web_ssh=git@gitlab.com/Meqqori/reactauth0nodedocker.git
delete_vol () {
    for vol in `docker volume ls --format "{{.Name}}"`
    do
        if [ $vol != "reactauth0nodedocker_db-data" ]
        then
                docker volume rm -f $vol
        fi
    done
}
nettoyage () {
        docker-compose kill
        docker-compose down --remove-orphans
        delete_vol
}
demarrage () {
        #docker-compose build
        docker-compose up -d --build > /dev/null
        docker ps
}
if [ -d $repo_local ]; then
        echo "repo existe...........OK"
        cd $repo_local
        echo "Entring the repo directory...........OK"
        pwd
        git pull
        echo "Sync repo directory...........OK"
        if [ $? -ne 0 ]; then
                echo "git pull not working...........KO"
                git stash -u
                echo "Initializing git stash -u...........OK"
                git pull
                "Resync repo directory...........OK"
        fi
        echo "Sync done...........OK"
        cp ./client/.env.homo ./client/.env
        echo "copying env file...........OK"
        nettoyage > /dev/null
        echo "Cleaning the server...........OK"
        demarrage
        echo "Starting the containers...........OK"
else
        echo "The repo does not exist...........KO"
        cd /home/ubuntu/
        echo "Entring the home directory...........OK"
        pwd
        git clone $repo_web_ssh
        echo "cloning the repo...........OK"
        cd $repo_local
        echo "Entring the repo directory...........OK"
        cp ./client/.env.homo ./client/.env
        echo "copying env file...........OK"
        nettoyage > /dev/null
        echo "Cleaning the server...........OK"
        demarrage
        echo "Starting the containers...........OK"
fi