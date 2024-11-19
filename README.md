After cloning this project, run this command in your terminal: 
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser ./InstallAWSCLI.ps1

please run docker-compose up --build to initialize the Docker containers. This command will automatically spin up
Dockerized Postgres database
Keycloak server
Nkwadoma Backend application
PS: The backend application will exit at first docker compose up run, and you'll need the keycloak server up and running to restart it.
The keycloak server will run on http//localhost:8082
-go to your browser and paste the keycloak url http//localhost:8082
-login with the username provided in the docker compose file
-create the realm = nkwadoma
-create the client = nkwadoma-client
-navigate to the created nkwadoma realm, click on it.
-navigate to the the credentials bar, click on it.
-in this credentails there's a hidden client secret, copy this secret
-go back to your project, and open the .env file.
-there are 2 keys:
KEYCLOAK_CLIENT_ID
KEYCLOAK_CLIENT_SECRET
-paste the copied client secret as the value for the KEYCLOAK_CLIENT_SECRET, and copy the client id and paste as the value for KEYCLOAK_CLIENT_ID
After followiwng the above instructions, run docker-compose up -d backend to restart the backend application.
PS: please stop any application running on this port 8081.
The backend application will run on http//localhost:8081. 
The swagger ui will run the backend APIs on http://localhost:8081/swagger-ui/index.html#/
-Try the application health endpoint http://localhost:8081/actuator/health to check the backend app health
 you will get a json response with "UP" 
This ensures a seamless development environment.
You can start your local developmment.  Thank you!!
