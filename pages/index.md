<script>
    import {browser} from "$app/environment";
</script>

# Welcome to Evidence

## Filtered Component

```sql items
select
    email,
    channel,
    sum(sales) as sales_usd
from orders
group by 1,2
```

{#if browser && $page.url.searchParams.get('channel')} <!-- Check for a filter in the URL -->

<DataTable data={items.filter(d=>d.channel === $page.url.searchParams.get('channel'))}/>

{:else}

<DataTable data={items}/>

{/if}