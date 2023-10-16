# Universal SQL Prerelease

**This is a prerelease version of Evidence. If you're looking for regular Evidence, you'll want to visit https://github.com/evidence-dev/template.** 


Thanks for trying out the prerelease version of our planned Universal SQL feature. 
If you have any feedback, please reach out to us on [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)! 

There are 2 major changes included in this prerelease:

**1. Multiple Data Sources in one project**

- Projects can now connect to multiple data sources simultaneously. For example, a Snowflake connection and a Postgres connection. 
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
1. Run `npm install` 
1. Run `npm run build:sources`
1. Run `npm run dev` 

Make sure you run `npm run build:sources` before `npm run dev`. 

### Multiple Datasources

The `sources` folder in Evidence projects is undergoing major changes; instead of containing standalone sql files and
csv files,
it is now made up of directories that each define different data sources (e.g. a Postgres connection, or a Snowflake connection).

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

The `connection.yaml` file contains details about what a data source is; including the type, and any connection
information.

A `postgres` connection would look something like this:

```yaml
name: local_postgres
type: postgres

options:
  user: ${environment_Variable}
  password: ${environment_Variable}
  host: localhost
  port: 5432
  database: postgres
  ssl:
    rejectUnauthorized: false
```

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
