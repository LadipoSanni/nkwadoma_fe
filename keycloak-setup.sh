#!/bin/bash

# Start Keycloak in dev mode
/opt/keycloak/bin/kc.sh start-dev &

# Login to Keycloak server and set configuration
/opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8082/auth \
  --realm master --user admin --password admin

# Wait for Keycloak to be ready
sleep 30  # Adjust timing based on system speed or replace with a health check

# Set up Keycloak realm and client
/opt/keycloak/bin/kcadm.sh create realms -s realm=nkwadoma2 -s enabled=true
echo "client created"
/opt/keycloak/bin/kcadm.sh create clients -r nkwadoma2 -s clientId=nkwadoma-client -s enabled=true

# Retrieve and export the client secret
CLIENT_SECRET=$(/opt/keycloak/bin/kcadm.sh get clients -r nkwadoma -q clientId=nkwadoma-client | jq -r '.[0].secret')
echo "I know your secret"
export CLIENT_SECRET
echo "Client Secret: $CLIENT_SECRET"
