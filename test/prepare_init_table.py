import requests


url = "http://localhost:8000/api/prepare-init-table"
data = {"n_empty_cells": 40}

response = requests.post(url, json=data)

if response.status_code == 200:
    print(response.json())
else:
    print(response.json())
