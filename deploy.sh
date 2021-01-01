#!/bin/bash

# -e: Exit immediately if a command exits with a non-zero status, -v: Print shell input lines as they are read.
set -evx

# Constants
PROJECT_ID="bert-faqclass"
HOSTNAME="eu.gcr.io"
SOURCE_IMAGE="fe_dashboard_bert_faqclass"
REMOTE_IMAGE=${HOSTNAME}/${PROJECT_ID}/${SOURCE_IMAGE}

COMPONENT="fe-dashboard-bert-faqclass"
SERVICE_ACCOUNT="${COMPONENT}@${PROJECT_ID}.iam.gserviceaccount.com"

REGION=europe-west1

# Deploy
gcloud run deploy \
    ${COMPONENT} \
    --project ${PROJECT_ID} \
    --platform managed \
    --region  ${REGION}\
    --image ${REMOTE_IMAGE} \
    --service-account ${SERVICE_ACCOUNT} \
    --memory 200M \
    --port 80 \
    --concurrency 2 \
    --allow-unauthenticated
