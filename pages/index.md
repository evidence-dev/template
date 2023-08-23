---
title: Welcome to Evidence
---

_Build polished data products with SQL and Markdown_

<LineChart
  data={orders_by_month}
  y=sales
  yFmt=usd0k
  title = 'Sales by Month, USD'
/>

## Write in Markdown

Evidence renders markdown files into web pages. This page is:
`[project]/pages/index.md`.

> **Try:**  Open this file, change some text and save it to see this page update instantly.

## Run SQL using Code Fences ` ``` `

```sql orders_by_month
select
  date_trunc('month', order_datetime) as order_month,
  count(*) as number_of_orders,
  sum(sales) as sales,
  sum(sales)/count(*) as average_order_value
from orders
where order_datetime >= '2020-01-01'
group by 1 order by 1 desc
```

You can see both the SQL and the query results by interacting with the query above.

> **Try:** Edit the above query to display all years of data by removing
> `where order_datetime >= '2020-01-01'`

## Show Data with Components

### Value in Text

Last month customers placed **<Value data={orders_by_month} column=number_of_orders/>** orders. The AOV was **<Value data={orders_by_month} column=average_order_value fmt=usd2/>**.

### Big Value 
<BigValue data={orders_by_month} value=sales fmt=usd0/>
<BigValue data={orders_by_month} value=number_of_orders />

> **Try:** Add another `<BigValue/>` showing `average_order_value`.

### Bar Chart


<BarChart data={orders_by_month} y=number_of_orders />

> **Try:** Change the chart to a `<LineChart>`.

### Data Table

<DataTable data={orders_by_month} rows=6>
  <Column id=order_month fmt=mmmm-yy/>
  <Column id=sales fmt=usd0 />
  <Column id=number_of_orders />
  <Column id=average_order_value fmt=usd2 />
</DataTable>


> **More:** See [all components](https://docs.evidence.dev/components/all-components)

## Control Output With If and Loops

[Use `{#if}` statements and `{#each}` loops](/control-statements) to determine what text and data is displayed.

# Share Data with Evidence Cloud

Evidence Cloud is the easiest way to securely share your data. 
- Get your project online
- Authenticate users
- Schedule data refreshes

<BigLink href=/settings#deployment>Deploy to Evidence Cloud &rarr;</BigLink>

You can use Netlify, Vercel or another static hosting provider to [self-host Evidence](https://docs.evidence.dev/deployment/overview).

# Get Support

- Message us on [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)
- Read the [Docs](https://docs.evidence.dev/)
- Open an issue on [Github](https://github.com/evidence-dev/evidence)
