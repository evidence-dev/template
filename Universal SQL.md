# Universal SQL

Thank you for trying out the prerelease version of our upcoming Universal SQL feature,
any feedback you can provide will help ensure that this feature is the best it can be.

There are 2 major changes included in this prerelease:

- You can now connect to more than one data source (Databases or APIs) in one project
- The concept of "Source Queries" has been introduced, which enable much higher levels of interactivity on the page.

## Multiple Datasources

The `sources` folder in Evidence projects is undergoing major changes; instead of containing standalone sql files and
csv files,
it is now made up of directories that define different data sources.

A `sources` folder may look something like this:

 ```
 sources/
    sales/
        connection.yaml
        sales_q3_22.csv
        sales_q4_22.csv
    application_analytics/
        connection.yaml
        page_views.sql
        bounce_rates.sql
 ```

This defines 2 data sources, made up of a directory (e.g. `sales`), and a `connection.yaml` file.

The `connection.yaml` file contains details about what a data source is; including the type, and any connection
information.

A `postgres` connection would look something like this:

 ```yaml
 # This isn't used right now, but will eventually be the name of the schema these tables will rely in
 name: local_postgres
 # Which type of database?
 type: postgres

 # Options will vary by datasource connector
 options:
     user: postgres
     password: postgres
     host: localhost
     port: 5432
     database: postgres
     ssl:
         rejectUnauthorized: false
```

## References

### Datasources

#### BigQuery

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/bigquery@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/bigquery: { }
    # ...
```

##### Options

| Option        | Type                                            | Note                                     |
|---------------|-------------------------------------------------|------------------------------------------|
| project_id    | string                                          |                                          |
| authenticator | one of 'service-account', 'oauth', 'gcloud-cli' |                                          |
| client_email  | string                                          | Only for `service-account` authenticator |
| private_key   | string                                          | Only for `service-account` authenticator |
| token         | string                                          | Only for `oauth` authenticator           |

#### CSV

##### Installation

The CSV connector is not currently supported for Universal SQL.
See (evidence-dev/evidence#966)[https://github.com/evidence-dev/evidence/issues/996]

#### DuckDB

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/duckdb@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/duckdb: { }
    # ...
```

##### Options

| Option   | Type   | Note |
|----------|--------|------|
| filename | string |      |

#### Faker

This is a tool for generating fake databases; it currently does not have
documentation, but there are examples in the sources directory. If you have
questions, don't hesitate to reach out
in [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/faker-datasource@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/duckdb: { }
    # ...
```

##### Options

This connector does not need any options

#### Microsoft SQL

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/mssql@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/mssql: { }
    # ...
```

##### Options

| Option                   | Type    | Note |
|--------------------------|---------|------|
| user                     | string  |      |
| host                     | string  |      |
| database                 | string  |      |
| password                 | string  |      |
| port                     | number  |      |
| trust_server_certificate | boolean |      |
| encrypt                  | boolean |      |

#### MySQL

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/mysql@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/mssql: { }
    # ...
```

##### Options

| Option         | Type   | Note |
|----------------|--------|------|
| user           | string |      | 
| host           | string |      | 
| database       | string |      | 
| password       | string |      | 
| port           | number |      | 
| socketPath     | string |      | 
| decimalNumbers | number |      | 

#### Postgres

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/mysql@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/mssql: { }
    # ...
```

##### Options

| Option   | Type   | Note                                                                    |
|----------|--------|-------------------------------------------------------------------------|
| host     | string |                                                                         | 
| database | string |                                                                         | 
| user     | string |                                                                         | 
| password | string |                                                                         | 
| port     | number |                                                                         | 
| ssl      | Object | See [node-postgres ssl options](https://node-postgres.com/features/ssl) |

#### Redshift

See [postgres](#postgres)

#### Snowflake

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/snowflake@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/snowflake: { }
    # ...
```

##### Options

| Option        | Type                                              | Note                                       |
|---------------|---------------------------------------------------|--------------------------------------------|
| project_id    | string                                            |                                            |
| authenticator | one of 'snowflake_jwt', 'externalBrowser', 'okta' |                                            |
| account       | string                                            |                                            |
| username      | string                                            |                                            |
| database      | string                                            |                                            |
| warehouse     | string                                            |                                            |
| role          | string                                            |                                            |
| schema        | string                                            |                                            |
| private_key   | string                                            | Only when authenticator is `snowflake_jwt` | 
| passphrase    | string                                            | Only when authenticator is `snowflake_jwt` | 
| password      | string                                            | Only when authenticator is `okta`          |
| okta_url      | string                                            | Only when authenticator is `okta`          |

#### SQLite

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/sqlite@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/sqlite: { }
    # ...
```

##### Options

| Option   | Type   | Note |
|----------|--------|------|
| filename | string |      |
