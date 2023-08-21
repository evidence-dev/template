# Welcome to Evidence

_Build polished data products with SQL and Markdown_

<LineChart
  data={orders_by_month}
  y=sales
  yFmt=usd0k
  title = 'Sales by Month, USD'
/>

## Write in Markdown

Evidence renders _markdown files_ into web pages. This page is:

`[my-project]/pages/index.md`.

> Open this file, change some text and save it to see this page update instantly.

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

> Edit the above query to display all years of data by removing:
>
> `where order_datetime >= '2020-01-01'`


## Include Values in Text with `<Value/>`

Last month customers placed **<Value data={orders_by_month} column=number_of_orders/>** orders. The AOV (average order value) was **<Value data={orders_by_month} column=average_order_value fmt=usd2/>**.

## Add Components

### Big Value 
<BigValue data={orders_by_month} value=sales fmt=usd0/>
<BigValue data={orders_by_month} value=number_of_orders />

👉 Add another `<BigValue/>` showing `average_order_value`.

### Bar Chart

Charts can be included in a single line of code:

<BarChart data={orders_by_month} y=number_of_orders title = 'Orders by Month' />

👉 Change the chart to a `<LineChart>`.

### Data Table

<DataTable data={orders_by_month}/>


<BigLink href="https://docs.evidence.dev/components/all-components">See All Components &rarr;</BigLink>

# Use Control Logic

Evidence supports using if statements & loops to determine what text and data is displayed.

<BigLink href="/control-logic">Using Control Logic &rarr;</BigLink>

# Create Templated Pages

Click on a category to see more detail about a category

```sql categories
select category
from orders
group by 1
```

<DataTable data={categories} link=category showLinkCol/>

# Share With Your Team

## Host on Evidence Cloud

Evidence Cloud is the easiest way to share data with your team. 
- Host your project
- Authenticate your users
- Schedule data refreshes

<BigLink href=/settings#deployment>Deploy to Evidence Cloud &rarr;</BigLink>

## Self-Host

You can self host Evidence with Vercel, Netlify or any other static hosting provider.

<BigLink href="https://docs.evidence.dev/deployment/overview">Get Started Self-Hosting &rarr;</BigLink>

# Get Support

- Message us on [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)
- Read the [Docs](https://docs.evidence.dev/)
- Open an issue on [Github](https://github.com/evidence-dev/evidence)
