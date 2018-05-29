# Sentry Webhook to Stride Room Micro-service 

Tutorial coming soon...

This is a simple service that transforms messages from a sentry webhook to a room in Stride using Room Tokens. It creates a message card for the room participants to see with color coded level callouts.

## Setup and Running

### Docker 

Pre-requisites

* Have Docker installed
* Have ngrok installed 

Steps
1. Copy .env_example to .env
2. Replace values in .env to match your sentry site and Stride room token values
3. Run `make run` or `make run-development` to build the docker image and run it locally
4. In another Terminal window run `ngrok http 8080` and copy the https url
5. In Sentry, go to a project's settings
6. Click Integrations
7. Click WebHooks
8. Paste the url you copied from step 4
9. Click `Save Changes` then Click `Test Plugin`

You should see a post on the docker container, then you should see a post to your Stride room that you have the Token installed in. 

### Local System

Pre-requisites

* Have Node 8+ installed
* Have ngrok installed 

Steps
1. Install npm packages with `npm i`
1. Copy .env_example to .env
2. Replace values in .env to match your sentry site and Stride room token values
3. Run `env $(cat .env | xargs) npm start` to start the server with the `.env` values
4. In another Terminal window run `ngrok http 8080` and copy the https url
5. In Sentry, go to a project's settings
6. Click Integrations
7. Click WebHooks
8. Paste the url you copied from step 5
9. Click `Save Changes` then Click `Test Plugin`

You should see a post on the docker container, then you should see a post to your Stride room that you have the Token installed in. 
