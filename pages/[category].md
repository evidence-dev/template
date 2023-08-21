# {$page.params.category}

The code for this page is in `pages/[category].md`. 

You can pass in different parameters to the page, and get different versions of the same template.


```sql category_sales
select 
date_trunc('month', order_datetime) as month,
category,
sum(sales) as sales
from orders
group by 1,2
```


## Sales

<BarChart 
    data={category_sales.filter(row => row.category == $page.params.category)} 
    y=sales 
    x=month
    yFmt=usd
    title="Sales of {$page.params.category} by Month"
/>

## Top Products

```sql top_products
select
item,
category,
sum(sales) as sales
from orders
group by 1,2
order by 3 desc
```

The most popular {$page.params.category} are:

{#each top_products.filter(row => row.category == $page.params.category) as product}

- The **{product.item}** with {fmt(product.sales,"usd")} in sales

{/each}
