# A Sylvia Plath Slack bot

'If you expect nothing from anybody, you’re never disappointed.'

## Set Up

Install the [Google Cloud SDK](https://cloud.google.com/sdk/).

Initialise `gcloud` (and authorise with your project):
```
gcloud init
```

[Install Node.js](https://nodejs.org/en/)

[Install Docker](https://www.docker.com/get-docker)

Install the dependencies:
```
npm install
```

## Slackbot

Create a Slack bot and generate an API token.

Save this as a file called `slack-token` in the project directory

## Running Locally

(Ctrl-C to close)
```
export slack_token_path=./slack-token
```

```
node plathbot.js
```

## Deploying

### Secrets API

Push the key to the Kubernetes Secrets API so that it is not in the Docker image:
```
kubectl create secret generic slack-token --from-file=./slack-token
```

### Packaging

Get your project ID:
```
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
```

Build a Docker image (change version number if required):
```
docker build -t gcr.io/${PROJECT_ID}/slack-plathbot:v1 .
```

Test Docker image:
```
docker run -d \
    -v $(pwd)/:/config \
    -e slack_token_path=/config/slack-token \
    gcr.io/${PROJECT_ID}/slack-plathbot:v1
```

Kill Docker container:
```
docker ps
```

```
docker stop <container_id>
```

Push to Google Container Registry:
```
gcloud docker -- push gcr.io/${PROJECT_ID}/slack-plathbot:v1
```

Create a Kubernetes cluster:
```
gcloud container clusters create plathbot-cluster \
      --num-nodes=2 \
      --zone=europe-west2-b \
      --machine-type n1-standard-1
```

When the cluster is created (takes some time) deploy to Kubernetes:
```
kubectl create -f slack-plathbot-deployment.yaml --record
```

Check the bot is running (`STATUS: Running`):
```
kubectl get pods
```

Your bot should be online in Slack so you can DM it or invite to a channel.

## Undeploying

Delete the deployment:
```
kubectl delete deployment slack-plathbot
```

Delete the cluster:
```
gcloud container clusters delete plathbot-cluster
```

You can also delete the image from the Container Registry if you wish to.
