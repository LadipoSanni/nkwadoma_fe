#!/bin/bash

# Start Keycloak in dev mode
/opt/keycloak/bin/kc.sh start-dev &

# Wait until Keycloak server is up and running by checking the server status
echo "Waiting for Keycloak to start on http://localhost:8082/auth..."
until $(curl --output /dev/null --silent --head --fail http://localhost:8082/auth); do
    printf '.'
    sleep 5
done
echo "Keycloak is up and running."

# Log in to Keycloak server with admin credentials
/opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8082/auth \
  --realm master --user admin --password admin

# Check if login was successful
if [ $? -ne 0 ]; then
  echo "Failed to log in to Keycloak. Please check your credentials and server status."
  exit 1
fi
echo "Successfully logged in to Keycloak."

# Set up Keycloak realm and client
/opt/keycloak/bin/kcadm.sh create realms -s realm=nkwadoma2 -s enabled=true
echo "Realm 'nkwadoma2' created."

/opt/keycloak/bin/kcadm.sh create clients -r nkwadoma2 -s clientId=nkwadoma-client -s enabled=true
echo "Client 'nkwadoma-client' created in realm 'nkwadoma2'."

# Retrieve and export the client secret
CLIENT_SECRET=$(/opt/keycloak/bin/kcadm.sh get clients -r nkwadoma2 -q clientId=nkwadoma-client | jq -r '.[0].secret')

# Check if the client secret retrieval was successful
if [ -z "$CLIENT_SECRET" ]; then
  echo "Failed to retrieve the client secret."
  exit 1
fi

echo "Client Secret retrieved: $CLIENT_SECRET"
export CLIENT_SECRET
