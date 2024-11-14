After cloning this project, please run docker-compose up --build to initialize the Docker containers. This command will automatically spin up:

Dockerized Postgres database
Keycloak server
sonarqube for code quality check
Nkwadoma Backend application
This ensures a seamless development environment. Thank you!

If you already are on the project and you need to develop and run locally, Pull the new code from the VCS, and please run docker-compose up --build to initialize the Docker containers. This command will automatically spin up:
Dockerized Postgres database
Keycloak server
sonarqube for code quality check
Nkwadoma Backend application
To pull the Nkwadoma Backend Apllication:
You'll need to Run these commands:
aws configure (PS : You need to have aws cli configured on your local machine to run this command, if you don't have please download and install);
which prompts you to input these credentials to connect to the AWS Account 
a1. AWS Access Key ID :
a2. AWS Secret Access Key =
a3. Default region name =
a4. Default output format =
PS : these credentials will be provided by the Cloud Team.
aws ecr get-login-password --region us-east-1  
docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
There are other service included in the docker-compose.yml file, Which include the postgres DB, sonarqube, and one of them is keycloak.
The keycloak will run on the port specified in the docker-compose file. you can copy this link and paste in your browser, login into the keycloak ui,
navigate to the realm of the nkwadoma application, then navigate to the credentials then copy the client secret and paste it in your text editor for use when required.
This ensures a seamless development environment. Thank you!
