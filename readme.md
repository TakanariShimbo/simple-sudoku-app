## 🔢About

fastapi Sudoku App

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
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

You can check api references [here](http://localhost:8000/docs/) after building server.
