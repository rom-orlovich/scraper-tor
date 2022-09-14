#!/bin/bash

if [ "$1" = "dep" ]; then
    docker compose down &&
    docker compose up mongo mongoex tor redis -d
elif [ "$1" = "server" ]; then
      docker compose up api
elif [ "$1" = 'client' ]; then
      docker compose up react
elif [ "$1" = 'all' ]; then
    docker compose down && docker compose up mongo mongoex tor redis -d 
    gnome-terminal -- /bin/bash -c   'docker compose up api; exec bash;'
    gnome-terminal -- /bin/bash -c   'docker compose up react; exec bash;'

fi
