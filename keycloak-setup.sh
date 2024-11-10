#!/bin/bash

# Start Keycloak in dev mode
/opt/keycloak/bin/kc.sh start-dev &

# Wait for Keycloak to be ready (use sleep or health check logic)
sleep 30  # Adjust timing as necessary

# Use the Keycloak CLI to create a realm and client, then retrieve the secret
/opt/keycloak/bin/kcadm.sh create realms -s realm=nkwadoma -s enabled=true
/opt/keycloak/bin/kcadm.sh create clients -r nkwadoma -s clientId=nkwadoma-client -s enabled=true

# Retrieve and export the client secret
CLIENT_SECRET=$(/opt/keycloak/bin/kcadm.sh get clients -r nkwadoma -q clientId=nkwadoma-client | jq -r '.[0].secret')
export CLIENT_SECRET
echo "Client Secret: $CLIENT_SECRET"
