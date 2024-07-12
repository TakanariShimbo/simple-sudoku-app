## 🚀 About

My template of Vite + React + Tailwind

![VITExREACTxTAILWIND](/README/vite-react-tailwind.png)

## 💻 Check

- require: npm

```sh
# install and build
npm ci
npm run build

# on vite server
npm run vite-preview

# on static server
npm run static-preview
```

You can check here (http://localhost:8000/) after building server.

## 📝 Memo

- require: volta

### 1 upgrade node & npm

```sh
volta install node@latest
volta install npm@latest
```

### 2 scaffold for project

```sh
# execute bellow command at project dir.
npm create vite@latest . -- --template react
```

### 3 remove eslint

- .eslintrc.cjs (remove file)
- package.json (remove a few row)

### 4 install modules

```sh
npm install
```

### 5 add tailwind

ref: https://tailwindcss.com/docs/guides/vite

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- src/index.css (replace to the Tailwind directives)
- tailwind.config.js (add contents)
- src/App.jsx (replace to check tailwind installation)
- src/asserts (remove dir)
- src/App.css (remove file)

### 6 change out dir of build

- vite.config.js (define outDir of build)

### 7 add static server

```sh
npm install http-server
```

- package.json (edit a few row)
