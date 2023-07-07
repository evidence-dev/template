# Welcome to Evidence!

<Alert status=warning>

This is a pre-release preview of Universal SQL. 

</Alert>

If you have ideas, shoot us a message on [Slack](https://join.slack.com/t/evidencedev/shared_invite/zt-uda6wp6a-hP6Qyz0LUOddwpXW5qG03Q)

## Write Markdown

Evidence renders markdown files into web pages. The file for this page is:

`[my-project]/pages/index.md`.

👉 Open this file, change some text and save it to see this page update instantly.

## Universal SQL

Write universal queries using markdown code fences ` ``` `:

Here we're querying the `orders` table defined in `sources/demo-data`. This table has about a million records in it. 

You have access to all of the tables defined in your sources directory. 

```all_orders

select 
	count(*) as n_orders
from orders 

```

```orders_by_month
select
  date_trunc('month', order_date) as order_month,
  count(*) as number_of_orders,
  sum(price*quantity) as sales_usd0k,
  sum(price*quantity)/count(*) as average_order_value_usd2
from orders

group by 1 order by 1 desc
```

You can see both the SQL and the query results by interacting with the query above.

## Accept inputs into queries 

<Alert status=info>
	This is new! 
</Alert>

Here we're syncing the value from an input into a query. 

Notice that the query is re-executed as you move the slider, and that the results are instant with a 1M record table. 

<RangeInput min=0 max=44 bind:inputPrice={inputPrice} />

```orders_by_month_filtered
select
  date_trunc('month', order_date) as order_month,
  count(*) as number_of_orders,
  sum(price*quantity) as sales_usd0k,
  sum(price*quantity)/count(*) as average_order_value_usd2
from orders
where price > ${inputPrice}

group by 1 order by 1 desc
```

<BarChart data={orders_by_month_filtered} y=number_of_orders title = {`Orders with prices greater than $${inputPrice} `} />

Last month customers placed **<Value data={orders_by_month} column=number_of_orders/>** orders, of which <Value data={orders_by_month_filtered} column=number_of_orders/> had prices greater than ${inputPrice}.


<script>
	let inputPrice = 0
</script>