## Technologies

- [TypeScript](https://www.typescriptlang.org/) (v4)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
  - [Simple Import Sort](https://github.com/lydell/eslint-plugin-simple-import-sort/)
  - [Import plugin](https://github.com/benmosher/eslint-plugin-import/)
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)
- [Node-Dependency-Injection](https://github.com/zazoomauro/node-dependency-injection)
- [WinstonLogger](https://github.com/winstonjs/winston)
- [MorganLoggerMiddleware](https://github.com/expressjs/morgan)

## Running the app

```
# install dependencies
npm install

# run in dev mode
sh start_environment.sh app

# stop app
sh stop_environment.sh app

# run in dev mode with elastic
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
