# Control Statements
Use your data to choose what Evidence displays with `{#if}` and `{#each}` statements.

# Loops

```category_sales
select
category,
    sum(sales) as sales,
    count(*) as number_of_orders
from orders
group by 1
order by 2 desc
```

`{#each}` statements loop through **each row** of a query, and generate text and charts.

## Sales by Category

{#each category_sales as category_row}
-  <Value data={category_row} column=category/>: 
<Value data={category_row} column=number_of_orders/> orders

{/each}

# If Statements

```orders_per_day
select
    date_trunc('day', order_datetime) as date,
    count(*) as number_of_orders,
    sum(sales) as sales
from orders
group by 1
order by 1 desc
limit 7
```

`{#if}` and `{:else}` statements control what content is shown to users based on custom logic.

## Sales vs Target, <Value data={orders_per_day} column=date row=0 fmt="mmm-dd" />

{#if orders_per_day[0].sales>500}

Exceeded sales target:  <Value data={orders_per_day} column=sales row=0 fmt=usd0/> / $500

Hooray! 🥳🥳🥳

{:else}

Missed sales target: 
<Value data={orders_per_day} column=sales row=0 fmt=usd0/> / $500

😞

{/if}

Loops and logic are often to powerful to combine - loop through data and only display data if certain conditions are met.
