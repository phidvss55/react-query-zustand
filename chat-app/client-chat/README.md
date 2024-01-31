# React + TypeScript + Vite

---

## Commands install

```
yarn add @mantine/core @mantine/hooks @mantine/form @mantine/dropzone @mantine/modals

yarn add -D typescript ts-node @graphql-codegen/cli @graphql-codegen/client-preset

npm i -D @parcel/watcher

yarn add @apollo/client graphql apollo-upload-client

yarn add zustand
```

## Run codegen

```shell
npx graphql-codegen --watch --verbose
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
