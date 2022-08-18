<!-- ToDo 
- Gifs of some of the visual tasks
- component gallery?
- shoirten links in final section
- get in value component - bigvalue?
- 👉 this number is from a query
- telemetry - collapse
- Feature -> Feature Reference






Later
Take proper review of other docs:
streamlit, electron, looker, hex

Collapse all components into one main section 
- Markdown
- SQL
- reindex search

## Docs notes
- markdown specs
-components - searchable, referencey
-->






# Welcome to Evidence! 👋
Evidence enables analysts to deliver a polished business intelligence system using SQL & markdown.

# Write Markdown
Evidence pages are just markdown files. The file for this page is `pages/index.md`.

👉 Add some text below and save the file to see it update instantly.

# Connect to a Database
👉 Connect to a database in the **Settings** menu. For this tutorial, choose a **SQLite** database and enter the filename `needful_things`. [Settings &rarr;](/settings)

![connect-db](connect-db.gif)

# Run SQL
Write queries using markdown code fences ` ``` `:

![sql-code](sql.svg)


```orders_by_month
select
  substr(order_datetime,1,7) as date,
  sum(sales) as sales_usd0k
from orders

group by date
```

You can see both the SQL and the query results by interacting with the query above.

👉 Edit the above query to just display 2021 data by adding:

`where order_datetime >= '2021-01-01'`

# Add Charts & Components
Charts can be included in a single line of code:

![barchart-code](BarChart.svg)

<BarChart data = {orders_by_month} title = 'Sales by Month, USD'/>

👉 Change the chart to a `LineChart`.

# Use More Powerful Features ⚡
Evidence supports using logic & loops to determine what text and data is displayed.

<BigLink href="/powerful-features">Using Logic & Loops &rarr;</BigLink>

# Share your Project 
To get your project online, see the deployment instructions in the [settings menu](/settings). More info is available in our [docs](https://docs.evidence.dev/deployment/deployment-overview).

If you would prefer not to self-host your project, you might be interested in our upcoming cloud service, Evidence Cloud. 

Sign up for early access [here](https://du3tapwtcbi.typeform.com/to/kwp7ZD3q).

# Get support 💬
- Message us on <a href='https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q' target="_blank">Slack</a>
- See all of our charts and components in our <a href="https://docs.evidence.dev/features/charts/examples" target="_blank">component library</a>.
- Read the <a href='https://docs.evidence.dev/' target="_blank">Docs</a>
- Open an issue on <a href='https://github.com/evidence-dev/evidence' target="_blank">Github</a>