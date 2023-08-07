# Universal SQL Prerelease

**This is a prerelease version of Evidence. If you're looking for regular Evidence, you'll want to visit https://github.com/evidence-dev/template.**

Thanks for trying out the prerelease version of our planned Universal SQL feature.
If you have any feedback, please reach out to us on [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)!

There are 2 major changes included in this prerelease:

**1. Multiple Data Sources in one project**

- Projects can now connect to multiple data sources simultaneously. For example, a Snowflake connection and a Postgres connection.
  - This includes support for multiple connections to the same type of database (e.g. 2 Postgres databases).
- Data sources are no longer restricted to SQL databases. We're adding support for direct connections to APIs and other tools.

**2. Universal SQL**

- Evidence projects now include a SQL runtime powered by [duckdb](https://duckdb.org/).
- Queries written in markdown files use this runtime.
- These queries can run across all of your data sources, meaning you can join data from two separate data sources.
- These SQL queries can accept inputs, allowing you to build interactive reports, and pass variables into them from templated pages.
- These queries are very performant, and allow you to work with much larger data sets

## What is included in this Prerelease?

tl;dr:

- You can use multiple databases in one project
- You can write queries across all of those data sources
- You can inject variables into your queries to create interactives (e.g. filters)
- You can pass large data sets into your reports

## Limitations

- There are lots of rough edges in this pre-release. In particular, you will often see an error state while the component is loading.

## Getting started

1. Clone this repo and checkout the `next` branch
1. Run `npm run build:sources`
1. Run `npm run dev`

Make sure you run `npm run build:sources` before `npm run dev`.

### Updating:

The prerelease releases frequently, to ensure you have the most up-to-date changes; run `npm upgrade`.

Note that breaking changes may be introduced, backing up your `package-lock.json` (or making sure you have it in version control before running the command) will ensure that you can revert to the previous versions if needed.

### Multiple Datasources

The `sources` folder in Evidence projects is undergoing major changes; instead of containing standalone sql files and
csv files, it is now made up of directories that each define different data sources (e.g. a Postgres connection, or a Snowflake connection).

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

This defines 2 data sources, each made up of a directory (e.g. `sales` or `application_analytics`) , and a `connection.yaml` file.

#### Configuring Data sources

##### `connection.yaml` (Version Controlled)

The `connection.yaml` file contains details about what a data source is; including the type, and any connection
information. You should not store secret values like passwords in this file, as it is included in source control. Instead, see [`connection.options.yaml`](#connectionoptionsyaml) or [`.env`](#envenvironment-variables)

A `postgres` connection would look something like this:

```yaml
name: local_postgres
type: postgres

options:
  user: username
  password: password # Note: passwords and other secret values should be configured via enviornment variables
  host: localhost
  port: 5432
  database: postgres
  ssl:
    rejectUnauthorized: false
```

##### `.env`/Environment Variables

Evidence can be configured by using a `.env` file in the root of your project.
This is the recommended way to configure secret values like passwords, and can also
be used to alias existing environment variables that you use to connect to data sources.

The names of environment variables used for configuration are predetermined based on the name
of your data source:

`EVIDENCE_SOURCE_[source name]_[source option]=[value]`

To configure the password for the above connection; the environment variable would be:

`EVIDENCE_SOURCE_local_postgres_password=postgres`

If you want to use an existing environment variable (e.g. `PG_PASSWORD`), you can prefix
that variable with `$` and use it as the value.

`EVIDENCE_SOURCE_local_postgres_password=$PG_PASSWORD`

Note that the `source name` is not case sensitive, but the `source option` _is_ case sensitive.

### Sources

The queries (SQL files and other) in the sources are executed and made available
as tables in your Evidence pages. Each of your source queries is executed
_at build time_, and the results are placed in a [parquet](https://parquet.apache.org/) file. These files are then loaded and queried against in a viewer's browser using [duckdb](https://duckdb.org/).

This has a few implications on how projects are built:

- You can now query against _all_ your data sources, regardless of what they are
  - e.g. you can join postgres data and snowflake data in your project
- You can have fewer queries against your warehouses (for free!)
- You can interpolate variables into your SQL
  - Interactive filters are now much easier to implement, and much more performant
  - Templated page variables can be used in queries, without needing to use Javascript

### Using the Example Database

The template includes a large example data set generated with a new [FakerJS](https://fakerjs.dev) connector. Each of the tables returned by faker are defined in `.yaml` files (e.g. `social_media/comments.yaml`).

Once you have built your sources `npm run build:sources`, and launched the dev server `npm run dev`.

You can see the home page, and some example universal SQL queries against the data.

We have also included a [new schema explorer](http://localhost:3000/explore/schema) at `explore/schema` which lists all of the tables returned by your sources.

### Passing inputs into queries

The home page includes an example of passing user input directly into a SQL query, using the `${input}` syntax.

As you adjust the input, the query re-executes.

### Adding additional connectors

If you want to use your own data, you can add connectors to the project. See instructions below.

1. Using the information in [References](#references) install the connectors you want to use
2. Create a new directory in `./sources`
3. Create a `connection.yaml` file
   1. You will need the following properties:
      1. `name`, arbitrary, currently unused
      2. `type`, database name (e.g. `postgres` or `bigquery`)
      3. `options`, see the reference for your database for the options needed
         1. Note that you should use [environment variables](#envenvironment-variables) for configuration that is secret (e.g. passwords), otherwise you risk checking your secrets into version control.
4. If using a SQL Connector, create some `.sql` files
   1. Each of these files will create a table in the client database, which will be named after the file (e.g. `test.sql` becomes the `test` table)
5. Repeat steps 2-4 for all the databases you would like
6. Run `npm run build:sources`

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

##### Example

`connection.yaml`

```yaml
name: my_bigquery_source
type: bigquery
options:
    project_id: your project id
    authenticator: 'service-account' or 'oauth' or 'gcloud-cli'
    client_email: only for service-account
    private_key: only for service-account
    token: only for oauth
```

#### CSV

The CSV Adapter lets you load arbitrary csv files into your Evidence Project.

There are a few notes to keep in mind when using it:

- Type inference sometimes resorts to strings when it is unclear
- Each CSV file will be placed into it's own table

##### Installation

Install as a dependency:

```shell
npm i -s @evidence-dev/csv@usql
```

Add to `evidence.plugins.yaml`

```yaml
# ...
databases:
    # ...
    @evidence-dev/csv: { }
    # ...
```

##### Options

The CSV Adapter does not take any options

##### Example

`connection.yaml`

```yaml
name: my_csv_adapter
type: csv
```

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

| Option   | Type   | Note                                                      |
| -------- | ------ | --------------------------------------------------------- |
| filename | string | This is relative to the source directory, not the project |

##### Example

`connection.yaml`

```yaml
name: my_duckdb_source
type: ddb

options:
  filename: ./needful_things.duckdb # This file would be located at ./evidence-project/sources/my_duckdb_source/needful_things.duckdb
```

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

##### Example

`connection.yaml`

```yaml
name: my_faker_datasource
type: faker
```


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

##### Example

`connection.yaml`

```yaml
name: my_mssql_source
type: mssql

options:
    user: evidence
    password: evidence # This should be stored as an environment variable, NOT in your connection.yaml file
    host: evidence.dev
    port: 12345
    trust_server_certificate: true
    encrypt: true
```

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

##### Example

`connection.yaml`

```yaml
name: my_mysql_source
type: mysql

options:
    user: evidence
    password: evidence # This should be stored as an environment variable, NOT in your connection.yaml file
    host: evidence.dev
    port: 12345
    database: evidence
    socketPath: /some/path
    decimalNumbers: 2
```

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

##### Example

`connection.yaml`

```yaml
name: my_psql_source
type: postgres

options:
    host: evidence.dev
    database: evidence
    user: evidence
    password: password # This should be stored as an environment variable, NOT in your connection.yaml file
    port: 5432
    ssl:
        rejectUnauthorized: true
```

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

##### Example

`connection.yaml`

```yaml
name: my_snowflake_source
type: snowflake

options:
    project_id: 12345
    authenticator: "snowflake_jwt" or "externalBrowser" or "okta"
    account: evidence
    username: evidence
    database: evidence
    warehouse: evidence
    role: evidence
    schema: evidence
    ### When Authenticator is snowflake_jwt
    private_key: evidence # This should be stored as an environment variable, NOT in your connection.yaml file
    passphrase: evidence # This should be stored as an environment variable, NOT in your connection.yaml file
    ### When Authenticator is Okta
    password: evidence # This should be stored as an environment variable, NOT in your connection.yaml file
    okta_url: https://evidence.dev

```


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

##### Example

`connection.yaml`

```yaml
name: my_sqlite_source
type: sqlite

options:
  filename: ./needful_things.sqlite # This file would be located at ./evidence-project/sources/my_sqlite_source/needful_things.sqlite
```