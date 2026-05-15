---
title: Analytics Dashboard
description: Evidence uses Markdown to write expressively in text.
full_width: true
---

<LastRefreshed/>


<!-- ![Principle Media Group logo](https://principlemediagroup.com.au/wp-content/uploads/2023/11/PMG_Logo-POS.png){width=300 height=200} -->
<!-- <img src="https://principlemediagroup.com.au/wp-content/uploads/2023/11/PMG_Logo-POS.png" alt="Principle Media Group logo" class="w-72"/> -->

<Details title='What to do in this page'>

  This page can be found in your project at `/pages/analytics.md`. You can use this page to perform basic analytics tasks based on the needful-things dataset from Duckdb.
</Details>



```sql categories
  select
      category
  from needful_things.orders
  group by category
```

```sql channels
select
    channel_group
from needful_things.orders
group by channel_group

```

<Dropdown data={categories} name=category value=category>
    <DropdownOption value="%" valueLabel="All Categories"/>
</Dropdown>

<Dropdown name=year>
    <DropdownOption value=% valueLabel="All Years"/>
    <DropdownOption value=2019/>
    <DropdownOption value=2020/>
    <DropdownOption value=2021/>
</Dropdown>

<Dropdown data={channels} name=channel_group value=channel_group>
    <DropdownOption value=% valueLabel="All Media Channels"/>
</Dropdown>


```sql summary_values
  select 
      date_trunc('month', order_datetime) as month,
      sum(sales) as sales_usd,
      avg(sales) as average_value_per_order,
      count(*) as orders
  from ${main_query}
  group by all
  order by month asc
```

<BigValue
    data={summary_values}
    value=sales_usd
    fmt=usd0
    title="Sales ($)"
    sparkline=month
/>

<BigValue
    data={summary_values}
    value=average_value_per_order
    fmt=usd2
    title="Average Value per Order ($)"
    sparkline=month
/>

<BigValue
    data={summary_values}
    value=orders
    title="Number of Orders"
    sparkline=month
/>

```sql main_query
    select
        *
    from needful_things.orders
    where category like '${inputs.category.value}' and channel_group like '${inputs.channel_group.value}'
    and date_part('year', order_datetime) like '${inputs.year.value}'

```



```sql orders_by_category
  select 
      date_trunc('month', order_datetime) as month,
      sum(sales) as sales_usd,
      category
  from ${main_query}
  group by all
  order by sales_usd desc
```

<BarChart
    data={orders_by_category}
    title="Sales by Month, {inputs.category.label}"
    x=month
    y=sales_usd
    series=category
/>

```sql orders_by_channel
  select 
      date_trunc('month', order_datetime) as month,
      sum(sales) as sales_usd,
      channel_group
  from ${main_query}
  group by all
  order by sales_usd desc
```

<AreaChart data={orders_by_channel} x=month y=sales_usd series=channel_group>
	<ReferenceArea xMin='2020-03-14' xMax='2020-12-01' label="Reference Area" color=warning/>
</AreaChart>

```sql orders_by_day
  select 
      order_datetime as date,
      sum(sales) as sales_usd
  from ${main_query}
  group by all
  order by date asc
```

<CalendarHeatmap
    data={orders_by_day}
    date=date
    value=sales_usd
    title="Sales Heatmap"
    subtitle="View sales trends by day of the week across multiple years."
/>

```sql orders_by_state
  select 
      state,
    --   order_datetime,
      sum(sales) as sales_usd
  from ${main_query}
  group by all
  order by state asc
```

<USMap
    data={orders_by_state}
    state=state
    value=sales_usd
/>






## What's Next?
- [Connect your data sources](settings)
- Edit/add markdown files in the `pages` folder
- Deploy your project with [Evidence Cloud](https://evidence.dev/cloud)

## Get Support
- Message us on [Slack](https://slack.evidence.dev/)
- Read the [Docs](https://docs.evidence.dev/)
- Open an issue on [Github](https://github.com/evidence-dev/evidence)
