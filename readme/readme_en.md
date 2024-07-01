README | [English](/readme/readme_en.md) | [日本語](/readme/readme_jp.md)

## 🚀About

This is repository of "Simple Sudoku App".  
You can access the website by clicking or scanning the QR code below.

[![QR-Code of WebSite](/readme/qr-code-simple-sudoku-app.png)](https://simple-sudoku-app.onrender.com/)

This application is powered by [OR-Tools](https://github.com/google/or-tools).  
UI was referenced from [sadanandpai/sudoku-solver](https://github.com/sadanandpai/sudoku-solver).

## 🐋Docker

- docker is required

### Build server

```bash
# Please set the .env file before executing it.
docker compose up -d
```

You can check api references [http://localhost:8000/docs/](http://localhost:8000/docs/) after building server.

### Build image

```bash
# Please change the username and tag correctly.
docker build -t takanarishimbo/simple-sudoku-app:v1.0.0 .
```

## 🐍Conda

- conda or miniconda is required

### Create venv

```sh
conda create -n simple_sudoku_app python=3.10
```

### Activate venv

```sh
conda activate simple_sudoku_app
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

You can check api references [http://localhost:8000/docs/](http://localhost:8000/docs/) after building server.
