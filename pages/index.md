# Welcome to Evidence! 👋
Build a polished business intelligence system using only SQL & Markdown.

# Write Markdown
Evidence creates pages from markdown files. The file for this page is:

`[my-project]/pages/index.md`.

👉 Open this file, change some text and save it to see this page update instantly.

# Connect to a Database
👉 Connect to a database in the **Settings** menu. For this tutorial, choose a **SQLite** database and enter the filename `needful_things`. 

![Connecting a database](connect-db.gif)

# Run SQL
Write queries using markdown code fences ` ``` `:

```orders_by_month
select
  substr(order_datetime,1,7) as date,
  count(*) as number_of_orders,
  sum(sales) as sales_usd0k,
  sum(sales)/count(*) as average_order_value_usd2
from orders

group by date order by 1 desc
```

You can see both the SQL and the query results by interacting with the query above.

👉 Edit the above query to just display 2021 data by adding:

`where order_datetime >= '2021-01-01'`

# Include Values in Text
Return values from queries in text: 

Last month customers placed <Value data={orders_by_month} column=number_of_orders/> orders.

Sometimes you need something *bigger*: 
<BigValue data={orders_by_month} value=sales_usd0k />

👉 Add another `<BigValue/>` above showing `average_order_value_usd2`.

# Add Charts & Components
Charts can be included in a single line of code:

<BarChart data = {orders_by_month} y=sales_usd0k title = 'Sales by Month, USD' />

👉 Change the chart to a `LineChart`.

# Use More Powerful Features ⚡
Evidence supports using logic & loops to determine what text and data is displayed.

<BigLink href="/powerful-features">Using Logic & Loops &rarr;</BigLink>

# Share your Project 
To get your project online, see the deployment instructions in the [settings menu](/settings). More info is available in our [docs](https://docs.evidence.dev/deployment/deployment-overview).

If you would prefer not to self-host your project, you might be interested in our upcoming cloud service, [Evidence Cloud](https://du3tapwtcbi.typeform.com/to/kwp7ZD3q). 

# Get Support 💬
- Message us on <a href='https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q' target="_blank">Slack</a>
- See all the charts and components in the <a href="https://docs.evidence.dev/features/charts/examples" target="_blank">component library</a>.
- Read the <a href='https://docs.evidence.dev/' target="_blank">Docs</a>
- Open an issue on <a href='https://github.com/evidence-dev/evidence' target="_blank">Github</a>