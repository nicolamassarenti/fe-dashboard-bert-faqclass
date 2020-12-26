#!/bin/bash

# -e: Exit immediately if a command exits with a non-zero status, -v: Print shell input lines as they are read.
set -evx

# Constants
PROJECT_ID="bert-faqclass"

SOURCE_IMAGE="fe_dashboard_bert_faqclass"
REMOTE_IMAGE=${SOURCE_IMAGE}

HOSTNAME=eu.gcr.io

# Building docker image
docker build --file ./containers/Dockerfile --tag ${SOURCE_IMAGE} .

# Pushing image to Google Container Registry
docker tag ${SOURCE_IMAGE} ${HOSTNAME}/${PROJECT_ID}/${REMOTE_IMAGE}
docker push ${HOSTNAME}/${PROJECT_ID}/${REMOTE_IMAGE}