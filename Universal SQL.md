# Universal SQL Prerelease

Thank you for trying out the prerelease version of our upcoming Universal SQL feature,
any feedback you can provide will help ensure that this feature is the best it can be.

There are 2 major changes included in this prerelease:

- You can now connect to more than one data source (Databases or APIs) in one project
- The concept of "Source Queries" has been introduced, which enable much higher levels of interactivity on the page.

## What is included in this Prerelease?

tl;dr:

- You can use multiple databases in one project
- You can join queries against these databases
- You can build more interactive reports (e.g. filters, drill-downs, etc)
  - There is a lot more work to be done on this front, it requires some svelte & javascript knowledge to implement, but before release there will be helper components

### Multiple Datasources

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

### Source Queries

The sql files (and other definitions) in the sources are now available
as tables in your Evidence pages. Each of your source queries is executed
_at build time_, and the results are placed in a [parquet](https://parquet.apache.org/) file. These files are then loaded and queried against in a viewer's browser using [duckdb](https://duckdb.org/).

This has a few implications on how projects are built:

- You can now query against _all_ your data sources, regardless of what they are
  - e.g. you can join postgres and snowflake in your project
- You can have fewer queries against your warehouses, any complex queries can be run against duckdb (for free!)
- You can interpolate variables into your SQL
  - Interactive filters are now much easier to implement, and much more performant
  - Templated page variables can be used in queries, without needing to use Javascript

## Getting Started

### Using the Example Database

1. Run `npm run build:sources`
2. Run `npm run dev`
3. Open [the new schema explorer](http://localhost:3000/explore/schema)
   1. This outlines the schema that your project queries will run against
4. Try writing some queries
   1. The [home page](http://localhost:3000) has a rudimentary query console
   2. You can also edit the pages to add new queries.

### Setting up custom connectors

1. Using the information in [References](#references) install the connectors you want to use
2. Create a new directory in `./sources`
3. Create a `connection.yaml` file
   1. You will need the following properties:
      1. `name`, arbitrary, currently unused
      2. `type`, database name (e.g. `postgres` or `bigquery`)
      3. `options`, see the reference for your database for the options needed
4. If using a SQL Connector, create some `.sql` files  
   1. Each of these files will create a table in the client database, which will be named after the file (e.g. `test.sql` becomes the `test` table)
5. Repeat steps 2-4 for all the databases you would like
6. Run `npm run build:sources`

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
| ------------- | ----------------------------------------------- | ---------------------------------------- |
| project_id    | string                                          |                                          |
| authenticator | one of 'service-account', 'oauth', 'gcloud-cli' |                                          |
| client_email  | string                                          | Only for `service-account` authenticator |
| private_key   | string                                          | Only for `service-account` authenticator |
| token         | string                                          | Only for `oauth` authenticator           |

#### CSV

##### Installation

The CSV connector is not currently supported for Universal SQL.
See [evidence-dev/evidence#966](https://github.com/evidence-dev/evidence/issues/996)

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
| -------- | ------ | ---- |
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
| ------------------------ | ------- | ---- |
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
| -------------- | ------ | ---- |
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
| -------- | ------ | ----------------------------------------------------------------------- |
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
| ------------- | ------------------------------------------------- | ------------------------------------------ |
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
| -------- | ------ | ---- |
| filename | string |      |
