## Description

A GraphQL service developed with NestJS in service of the frontend of the "Amsterdam Inspectie Portaal" app.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma

### Re-generating the schema.prisma file

Database migrations are still managed by Knex. Therefore we do not rely on Prisma migrations here.
Instead `schema.prisma` and the prisma client should be regenerated after the knex migrations have been rolled out:

```shell
npx prisma db pull
node_modules/.bin/prisma generate
```

You might have to restart the TypeScript service in IntelliJ after this to re-index the regenerated prisma client.

## License

MPL-2.0. See `./LICENSE`
