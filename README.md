# MaxCompany Kernel

## Architecture, Installation and Deployment

### Installation and Deployment in the local machine

    -install docker and docker-compose.
    -clone the projet into your local machine .
    -build the project from the root of your projetFile
        with the command : docker-compose build
    -start the database container
        with the command : docker-compose up -d postgres
        and wait until the database it's up
    -start the rest of the container
        with the commande : docker-compose up -d

    wait a couple seconds :
        you can access your front at :
            https://localhost:3000
        you can access your back at :
            https://localhost:3001

    to use pgadmine to access your database:
        make a new connection with the parameters:
            -host : localhost
            -username : admin
            -password : admin
            -port : 5432

### Docker Commandes

    -docker ps (display all running containers)
    -docker ps -a (display all containers running&stopped)
    -docker-compose logs -f (display all logs)
    -docker-compose logs -f container_name_or_id (display logs of a specific container)
    -docker-compose start
    -docker-compose stop
    -docker-compose up -d 
    -docker-compose down
    -docker volume ls (display all volumes)
    -docker volume ls -q
    -docker volume ls -q |xargs docker volume rm
    -docker image ls
    -docker image ls -a
    -docker image ls -aq
    -docker image ls -aq | xargs docker image rm

### Used Envirements

    - Prod : https://trello.website/
    - homologation : https://maxcompany.xyz/

## Team members

Sales representative:

Developer team :

- **Amine KASMI** (amineKasmi@gmail.com)
- **Amine OUASTI** (amineOuasti@gmail.com)
- **Omar SAIDI** (omarSaidi@gmail.com)

Tech Lead

Dev Ops :

- **El-Mehdi Guemrani** (mguemrani@gmail.com)

Architect / Ops

- **Khalil MEQQORI** (meqqorikhalil@gmail.com)

Scrum Masters:

    ---------------------------------------------

## Product Owners:

## Product Manager / Sponsor:

## Former team members:
# -reactAuth0NodeDocker
