## Description

A GraphQL service developed with NestJS in service of the frontend of the "Amsterdam Inspectie Portaal" app.

## Schema documentation

Documentation can be viewed locally via SpectaQL, or use your favorite GraphQL client to inspect the schema.
Make sure the service is running via `npm run start` and execute `npm run graphql-docs`.
Visit `http://localhost:4400/` to browse the available queries and mutations.

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

## Importing measure options for survey type 'Overspaningsinstallaties'

As of writing the dropdown options used in 'Overspanningsinstallaties' contract 3: maatregelen are imported manually.
The business delivers us an XLSX file that contains 3 sheets: "Maatregelen" (title + mapping with materials and specificationItems), "Materialen" and "Besteksposten". Part of the Jest test suite is a unit test that validates the generated .json file, to maintain the integrity of this .json file.

-   Place newly supplied .xlsx file in /docs folder
-   Update the `READ_FILE_OVS_MEASURES` .env variable with the correct filename
-   Run `npm console ovs:import-measure-options` locally
-   Check the newly generated `normalized-data-measures.json` file in your working tree
-   Commit your changes (the `import-span-measure-options.spec` test should be green)

## License

MPL-2.0. See `./LICENSE`
