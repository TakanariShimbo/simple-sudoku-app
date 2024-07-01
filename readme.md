## 🔢About

FastAPI Sudoku App

## 🐋Docker

- docker is required

### Build server

```bash
# Please set the .env file before executing it.
docker compose up -d
```

### Build image

```bash
# Please change the username and tag correctly.
docker build -t takanarishimbo/fastapi-sudoku-app:v1.0.0 .
```

## 🐍Conda

- conda or miniconda is required

### Create venv

```sh
conda create -n fastapi_sudoku_app python=3.10
```

### Activate venv

```sh
conda activate fastapi_sudoku_app
```

### Install libs

```sh
# Please activate venv before executing it.
pip install -r requirements.txt
```

### Build server

```sh
# Please activate venv before executing it.
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You can check api references [here](http://localhost:8000/docs/) after building server.
