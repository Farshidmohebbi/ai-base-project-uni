FROM python:3.10-slim-buster

WORKDIR /usr/src/app

COPY ./core .

# RUN apt-get update && \
#     apt-get install -y espeak

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
