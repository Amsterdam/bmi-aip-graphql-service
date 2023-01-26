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

NOTE: A `db pull` should only be performed when you are actively working on a database change and you know what you are
doing.

```shell
# Introspect the database and overwrite the schema.prisma file
npx prisma db pull
# Re-generate the Prisma client using the updated schema.prisma file
node_modules/.bin/prisma generate
```

You might have to restart the TypeScript service in IntelliJ after this to re-index the regenerated prisma client.

### Re-generating the prisma client

When checking out a branch or pulling code that contains updates to the `schema.prisma` file (after a change to the
database structure was made) it will be necessary to re-generate the Prisma client by running the following command:

```shell
node_modules/.bin/prisma generate
```

## GISIB API

This project contains a [GISIB](https://www.gisib.nl/) API integration. At the time of writing the OpenAPI
specification that describes this API does not provide information on the shape of the various GISIB entities. For the
time being, while we can not generate TypeScript definitions from the OpenAPI specification
using a library, a quick 'n dirty generator was written to avoid having to construct and maintain these type
definitions manually. To generate these type definitions, ensure the GISIB*API*\* environment variables are populated
and then run:

```shell
npm run generate:gisib-api-types
```

## License

MPL-2.0. See `./LICENSE`
