# More Powerful Features ⚡
This tutorial covers some of Evidence's more powerful features: Loops and Logic.

## Tutorial Dataset: Needful Things
This tutorial uses a dataset from Needful Things Inc, a fictional e-Commmerce store. 

`needful_things.db` contains 4 tables: **orders, marketing_spend, reviews** and **deliveries**. 10 rows of data for each are shown below

```orders
select * from orders limit 10
```

```marketing_spend
select * from marketing_spend limit 10
```

```reviews
select * from reviews limit 10
```

```deliveries
select * from deliveries limit 10
```

## Loops

```category_sales
select
category,
round(sum(sales)) as sales_usd
from orders
group by category
order by sales_usd desc
```

You can use `{#each}` statements to loop through and generate text and charts.

**Sales by Category:**

{#each category_sales as category_row}

- {category_row.category}: 
<Value data={category_row} column=sales_usd/>

{/each}

👉 _Add the following after `- {category_row.category}:` to show the sales per category:_

`<Value data={category_row} column=sales_usd/>`

## Logic

```orders_per_day
select
substr(order_datetime,1,10) as date,
sum(sales) as sales_usd
from orders
group by 1
order by 1 desc
limit 7
```

Use `{#if}` and `{#else}` statements to control what content is show to users based on custom logic.

**Sales vs Target**

{#if orders_per_day[0].sales_usd>3000}

Met sales target
on <Value data={orders_per_day} column=date row=0 />:  
<Value data={orders_per_day} column=sales_usd row=0 /> / $3,000

Hooray! 🥳🥳🥳

{:else}

Missed sales target 
on <Value data={orders_per_day} column=date row=0 /> 😞: 
<Value data={orders_per_day} column=sales_usd row=0 /> / $3,000

{/if}

<br>

👉 _Replace occurrences of `row=0` with `row=1` in the page above to see if the sales target was met on the second most recent day in the dataset_

Loops and logic are often to powerful to combine - loop through data and only display data if certain conditions are met.

<br>
<br>