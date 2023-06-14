# Welcome to Evidence!

Build polished data products with SQL and Markdown.

## Write Markdown

Evidence renders markdown files into web pages. The file for this page is:

`[my-project]/pages/index.md`.

👉 Open this file, change some text and save it to see this page update instantly.

## Run SQL

<Alert status=info>
Use the top right menu and select Show / Hide Queries to show or hide the SQL queries on this page.
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

## Query CSVs

If you are using the DuckDB or CSV connector, you can query a CSV file using SQL. Just add a folder to the root of your project called `/sources` and add your CSV files to that folder.

To query a CSV file, use the syntax below. 

`select * from 'sources/myfile.csv'`

This feature is powered by DuckDB: see the [DuckDB docs](https://duckdb.org/docs/sql/query_syntax/select) for a complete reference. This can also be used to query Parquet files.

## Include Values in Text

Return values from queries in text using the `Value` component:

Last month customers placed **<Value data={orders_by_month} column=number_of_orders/>** orders.

## Add Components

### Big Values
<BigValue data={orders_by_month} value=sales_usd0k />
<BigValue data={orders_by_month} value=number_of_orders />

👉 Add another `<BigValue/>` showing `average_order_value_usd2`.

### Charts

Charts can be included in a single line of code:

<BarChart data={orders_by_month} y=sales_usd0k title = 'Sales by Month, USD' />

👉 Change the chart to a `LineChart`.

### Tables

<DataTable data={orders_by_month}/>


# Use Control Logic 🎛️

Evidence supports using if statements & loops to determine what text and data is displayed.

<BigLink href="/control-logic">Using Control Logic &rarr;</BigLink>

# Share your Project

## Deploy Online
To get your project online, see the deployment instructions in the [settings menu](settings). More info is available in our [docs](https://docs.evidence.dev/deployment/overview).

If you would prefer not to self-host your project, you might be interested in our upcoming cloud service, [Evidence Cloud](https://du3tapwtcbi.typeform.com/to/kwp7ZD3q).

## Export PDF
You can also generate a PDF of an Evidence page - use the top right menu to select Export PDF.

## Download CSVs & Images
If you need to share individual pieces of information, Evidence data viz components come with buttons for CSV download and chart image download - hover over a component to see these options.

# Get Support 

- Message us on [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)
- See all the charts and components in the [component library](https://docs.evidence.dev/components/all-components)
- Read the [Docs](https://docs.evidence.dev/)
- Open an issue on [Github](https://github.com/evidence-dev/evidence)
