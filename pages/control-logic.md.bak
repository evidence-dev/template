# 🎛️ Control Logic
This page covers using your data to choose what Evidence displays with Loops and Conditionals.

# Loops

```category_sales
select
category,
sum(sales) as sales_usd0k
from orders
group by 1
order by 2 desc
```

You can use `{#each}` statements to loop through **each row** of a query, and generate text and charts.

## Sales by Category

{#each category_sales as category_row}
- {category_row.category}: 


{/each}

👉 Add the following after `- {category_row.category}:` to show the sales per category:

`<Value data={category_row} column=sales_usd0k/>`

# If Statements

```orders_per_day
select
date_trunc('day', order_datetime) as date,
sum(sales) as sales_usd
from orders
group by 1
order by 1 desc
limit 7
```

Use `{#if}` and `{:else}` statements to control what content is show to users based on custom logic.

## Sales vs Target

{#if orders_per_day[0].sales_usd>3000}

Met sales target
on <Value data={orders_per_day} column=date row=0 />:  
<Value data={orders_per_day} column=sales_usd row=0 /> / $3,000

Hooray! 🥳🥳🥳

{:else}

Missed sales target 
on <Value data={orders_per_day} column=date row=0 />: 
<Value data={orders_per_day} column=sales_usd row=0 /> / $3,000

😞

{/if}



👉 Replace occurrences of `0` with `1` in the section above to see if the sales target was met on the second most recent day in the dataset.

Loops and logic are often to powerful to combine - loop through data and only display data if certain conditions are met.
