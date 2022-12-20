This module provides various CLI commands that can be run on a developers machine while interfacing with any
environment that is running an instance of this GraphQL service (assuming both are running on/are deployed from the
same git branch).

In example, to run one of these commands, ensure your env file has the following:

```dotenv
AIP_REMOTE_URL='http://localhost:3000/graphql' # Remote GraphQL service we'll be interfacing with
AIP_REMOTE_TOKEN='KEYCLOAK_BEARER_TOKEN' # Keycloak bearer token
```

On confluence you can information on how to generate a local admin user Keycloak token.

## The `ovs:set-survey-surveyor` command

Loops over all OVS surveys and sets the surveyorCompanyId on the `surveys` table record based on the batch executor
that is configured on the active batch that the object/asset is placed in.

It was developed from the point of view that this would be a script that would be run once after which it could be
removed. Our OVS stakeholder has since come back to us and requested to run this script every now and again.
Potentially this script will be replaced by the ability for the OVS stakeholder to run this by clicking a button
from inside the application. In that case a refactor might be in order to move this logic into an appropriate module.

## The `nen2767:migrate-decomposition` command

This command aims to perform a Nen2767 decomposition data migration for all objects. After running this command,
each survey will have its own decomposition tree which is scoped by surveyId.

### Limit to one or a few object codes for testing/debugging

By adding the following to your `.env` file, the migration is only performed for the objects with the given codes:

```dotenv
NEN2767_MIGRATION_OBJECT_CODES='BRU0175,BRU0176'
```

NOTE: comma separated, no spaces
