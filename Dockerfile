FROM python:3.10-slim

WORKDIR /work

COPY . /work

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000