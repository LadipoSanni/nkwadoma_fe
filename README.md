1 During Development to run the Nkwadoma Frontend application on your local machine, You have to pull the Nkwadoma backend application from the AWS private ecr Repo.
2 And Run these commands:
a. aws configure (PS : You need to have aws cli configured on your local machine to run this command);
which prompts you to input these credentials to connect to the AWS Account 
a1. AWS Access Key ID :
a2. AWS Secret Access Key =
a3. Default region name =
a4. Default output format =
PS : these credentials will be provided by the Cloud Team.
aws ecr get-login-password --region us-east-1  
docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
3 There are other service included in the docker-compose.yml file,Which include the nkwadoma backend, DB, sonarqube, and one of them is keycloak.
3a. the keycloak will run on the port specified in the docker-compose file. you can copy this link and paste in your browser login in to the keycloak ui,
navigate to the realm of the nkwadoma application, next ; navigate to the credentials then copy the client secret and paste it in your text editor for use when required.
