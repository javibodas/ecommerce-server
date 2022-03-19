## Features

- [TypeScript](https://www.typescriptlang.org/) (v4)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
  - [Simple Import Sort](https://github.com/lydell/eslint-plugin-simple-import-sort/)
  - [Import plugin](https://github.com/benmosher/eslint-plugin-import/)
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)
- [GitHub Action workflows](https://github.com/features/actions) set up to run tests and linting on push

## Running the app

```
# install dependencies
npm install

# run in dev mode on port 3000
sh start_environment.sh
```

## Testing

### Jest with supertest

```
npm run test
```

## Linting

```
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```
