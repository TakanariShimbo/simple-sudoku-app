README | [English](/readme/readme_en.md) | [日本語](/readme/readme_jp.md)

## 🚀 はじめに

「シンプル数独アプリ」のリポジトリです。  
以下の QR コードをスキャン、あるいはクリックすると、ウェブサイトにアクセスできます。

[![QR-Code of WebSite](/readme/qr-code-simple-sudoku-app.png)](https://simple-sudoku-app.onrender.com/)

このアプリでは、[OR-Tools](https://github.com/google/or-tools) を利用しています。  
UI は、 [sadanandpai/sudoku-solver](https://github.com/sadanandpai/sudoku-solver) を参考にさせていただきました。

## 🐋Docker

- 前提：docker がインストール済み

### サーバーの立ち上げ

```bash
# 実行する前に .env を設定する
docker compose up -d
```

サーバー起動後は、[http://localhost:8000/docs/](http://localhost:8000/docs/) にアクセスすると API リファレンスを閲覧できます。

### イメージのビルド

```bash
# ユーザー名、タグは適切に設定する
docker build -t takanarishimbo/simple-sudoku-app:v1.0.0 .
```

## 🐍Conda

- 前提：conda あるいは miniconda がインストール済み

### 仮想環境の作成

```sh
conda create -n simple_sudoku_app python=3.10
```

### 仮想環境の有効化

```sh
conda activate simple_sudoku_app
```

### ライブラリのインストール

```sh
# 実行する前に仮想環境を有効化する
pip install -r requirements.txt
```

### サーバーの立ち上げ

```sh
# 実行する前に仮想環境を有効化する
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

サーバー起動後は、[http://localhost:8000/docs/](http://localhost:8000/docs/) にアクセスすると API リファレンスを閲覧できます。
