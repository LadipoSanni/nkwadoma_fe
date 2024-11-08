To run the Nkwadoma Frontend application on your local machine, you must pull the Nkwadoma backend application from the AWS private ecr.
And Run these commands:
aws configure (PS : You need to have aws cli configured on your local machine to run this command);
which prompt you to input these credentials to connect to the AWS Account 
AWS Access Key ID :
AWS Secret Access Key =
Default region name =
Default output format =
PS : these credentials will be provided by the Cloud Team.
aws ecr get-login-password --region us-east-1  
docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
