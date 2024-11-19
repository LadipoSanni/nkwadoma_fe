After cloning this project, run this command in your terminal to install Docker, and Docker compose on your linux system:
chmod +x install_docker.sh
sudo ./install_docker.sh

Install Docker for Windows:
Install (WSL) Windows Subsystem for Linux on your local machine.
Open PowerShell.
-run this command: ./install_docker_desktop.ps1
Wait for the download and installation to complete.
To check if the download and installation is successful run: docker --version, docker-compose --version

Then, run this command in your terminal to install and configure AWS CLI:
For Windows:
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser ./InstallAWSCLI.ps1

For Linux:
  run:
    chmod +x start.sh
    ./start.sh
    
To start up the backend application with its other services:
run:
  docker-compose -f keycloak-docker-compose.yml up

This will start keycloak on http://localhost:8082, username is "admin" and password is "admin"

-go to your browser and paste the keycloak url http//localhost:8082
-login with the username provided in the docker compose file
-create the realm = nkwadoma
-create the client = nkwadoma-client
-while creating the client switch the client authentication on.
-navigate to the created nkwadoma realm, click on it.
-navigate to the client you created and click, on the tabs you'd see a tab for credentials bar, click on it.
-in this credentials there's a hidden client secret, copy this secret
-go back to your project, and open the .env file.
-paste the secret key you copied to this key:
  KEYCLOAK_CLIENT_SECRET
- The client-id and realm you created must match the one in your env
- Also replace the SUPERADMIN_EMAIL to your personal email
- Still on keycloak, search for realm roles under the realm you created and create the following roles:
  LOANEE, 
  SPONSOR, 
  ORGANIZATION_ADMIN, 
  ADMIN, 
  DONOR, 
  ENDOWER, 
  INVESTOR 
  PORTFOLIO_MANAGER. 
After followiwng the above instructions, run docker-compose up -d to start the backend application and other services.
PS: Ensure you run all these commands at the root of the application,
The backend application will run on http//localhost:8081.
The swagger ui will run the backend APIs on http://localhost:8081/swagger-ui/index.html#/
-Try the application health endpoint http://localhost:8081/actuator/health to check the backend app health
 you will get a json response with "UP"
Note: Remember to change your DEV_AUTH_URL to http//localhost:8081/api/v1


To stop all running container
  run: docker-compose down
      docker-compose -f keycloak-docker-compose.yml down
      
This ensures a seamless development environment and integration.
You can start your local developmment.  Thank you!!
