# Welcome to Evidence!

<Alert status=success>
This project includes everything you need to get started with Evidence, including a tutorial DuckDB database.
</Alert>

## Connect to the Tutorial Database

👉 In the **Settings** menu, choose **DuckDB** and enter the filename `needful_things.duckdb`.

Evidence supports Snowflake, BigQuery, Redshift, Postgres, SQLite, DuckDB, CSVs & [more](https://docs.evidence.dev/core-concepts/data-sources/#how-to-query-a-csv-file)!

![Connecting a data source](connect-data-source.gif)

## Write Markdown

Evidence renders markdown files into web pages. The file for this page is:

`[my-project]/pages/index.md`.

👉 Open this file, change some text and save it to see this page update instantly.


## Run SQL

<Alert status=info>
To see the SQL queries on a page, click the top right menu and select Show Queries
</Alert>

Write queries using markdown code fences ` ``` `:

```orders_by_month
select
  date_trunc('month', order_datetime) as order_month,
  count(*) as number_of_orders,
  sum(sales) as sales_usd0k,
  sum(sales)/count(*) as average_order_value_usd2
from orders

group by 1 order by 1 desc
```

You can see both the SQL and the query results by interacting with the query above.

👉 Edit the above query to just display 2021 data by adding:

`where order_datetime >= '2021-01-01'`

## Query CSV Files
<Alert status=info>
If you are using the DuckDB connector or the CSV connector, you can query a CSV file using SQL. Just add a folder to the root of your project called `sources` and add your CSV files to that folder.
</Alert>

To query a CSV file, use the syntax below. This feature is powered by DuckDB, so all commands can be found in the [DuckDB docs](https://duckdb.org/docs/sql/query_syntax/select)

`select * from 'sources/myfile.csv'`

OR

`select * from 'Users/myname/Downloads/myfile.csv'`

This also works for Parquet files.

## Include Values in Text

Return values from queries in text:

Last month customers placed **<Value data={orders_by_month} column=number_of_orders/>** orders.

Sometimes you need something *bigger*: 
<BigValue data={orders_by_month} value=sales_usd0k />
<BigValue data={orders_by_month} value=number_of_orders />

👉 Add another `<BigValue/>` showing `average_order_value_usd2`.

## Add Charts & Components

Charts can be included in a single line of code:

<BarChart data = {orders_by_month} y=sales_usd0k title = 'Sales by Month, USD' />

👉 Change the chart to a `LineChart`.

# Use Control Logic 🎛️

Evidence supports using if statements & loops to determine what text and data is displayed.

<BigLink href="/control-logic">Using Control Logic &rarr;</BigLink>

# Share your Project

To get your project online, see the deployment instructions in the [settings menu](/settings). More info is available in our [docs](https://docs.evidence.dev/deployment/overview).

If you would prefer not to self-host your project, you might be interested in our upcoming cloud service, [Evidence Cloud](https://du3tapwtcbi.typeform.com/to/kwp7ZD3q).

# Get Support 

- Message us on [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)
- See all the charts and components in the [component library](https://docs.evidence.dev/components/all-components)
- Read the [Docs](https://docs.evidence.dev/)
- Open an issue on [Github](https://github.com/evidence-dev/evidence)
