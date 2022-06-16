```intro
    select '2009-12-31' as year, 'Canada' as country, 10000000 as sales_usd
    union all
    select '2010-12-31' as year, 'Canada' as country, 13500000 as sales_usd
    union all
    select '2011-12-31' as year, 'Canada' as country, 16800000 as sales_usd
    union all
    select '2012-12-31' as year, 'Canada' as country, 18900000 as sales_usd
    union all
    select '2013-12-31' as year, 'Canada' as country, 24000000 as sales_usd
    union all
    select '2014-12-31' as year, 'Canada' as country, 28200000 as sales_usd
    union all
    select '2015-12-31' as year, 'Canada' as country, 29400000 as sales_usd
    union all
    select '2016-12-31' as year, 'Canada' as country, 18800000 as sales_usd
    union all
    select '2017-12-31' as year, 'Canada' as country, 20100000 as sales_usd
    union all
    select '2018-12-31' as year, 'Canada' as country, 24400000 as sales_usd
    union all
    select '2019-12-31' as year, 'Canada' as country, 26800000 as sales_usd
    union all
    select '2020-12-31' as year, 'Canada' as country, 37600000 as sales_usd
    union all
    select '2021-12-31' as year, 'Canada' as country, 43400000 as sales_usd
    union all
    select '2009-12-31' as year, 'US' as country, 11400000 as sales_usd
    union all
    select '2010-12-31' as year, 'US' as country, 15200000 as sales_usd
    union all
    select '2011-12-31' as year, 'US' as country, 18800000 as sales_usd
    union all
    select '2012-12-31' as year, 'US' as country, 21600000 as sales_usd
    union all
    select '2013-12-31' as year, 'US' as country, 22500000 as sales_usd
    union all
    select '2014-12-31' as year, 'US' as country, 23200000 as sales_usd
    union all
    select '2015-12-31' as year, 'US' as country, 25100000 as sales_usd
    union all
    select '2016-12-31' as year, 'US' as country, 28000000 as sales_usd
    union all
    select '2017-12-31' as year, 'US' as country, 33800000 as sales_usd
    union all
    select '2018-12-31' as year, 'US' as country, 34800000 as sales_usd
    union all
    select '2019-12-31' as year, 'US' as country, 37700000 as sales_usd
    union all
    select '2020-12-31' as year, 'US' as country, 39000000 as sales_usd
    union all
    select '2021-12-31' as year, 'US' as country, 40100000 as sales_usd
    union all
    select '2009-12-31' as year, 'UK' as country, 11100000 as sales_usd
    union all
    select '2010-12-31' as year, 'UK' as country, 10600000 as sales_usd
    union all
    select '2011-12-31' as year, 'UK' as country, 10400000 as sales_usd
    union all
    select '2012-12-31' as year, 'UK' as country, 10100000 as sales_usd
    union all
    select '2013-12-31' as year, 'UK' as country, 10800000 as sales_usd
    union all
    select '2014-12-31' as year, 'UK' as country, 12000000 as sales_usd
    union all
    select '2015-12-31' as year, 'UK' as country, 14100000 as sales_usd
    union all
    select '2016-12-31' as year, 'UK' as country, 15800000 as sales_usd
    union all
    select '2017-12-31' as year, 'UK' as country, 19400000 as sales_usd
    union all
    select '2018-12-31' as year, 'UK' as country, 21100000 as sales_usd
    union all
    select '2019-12-31' as year, 'UK' as country, 23400000 as sales_usd
    union all
    select '2020-12-31' as year, 'UK' as country, 25800000 as sales_usd
    union all
    select '2021-12-31' as year, 'UK' as country, 28800000 as sales_usd
```

# Charts

## Line Chart
<LineChart
    data={data.intro}
    x=year
    y=sales_usd
    series=country
    title='Sales by Country'
    subtitle='$ in USD'
    yAxisTitle='annual sales'
/>

## Area Chart
<AreaChart
    data={data.intro}
    x=year
    y=sales_usd
    series=country
/>

## Stacked Bar Chart
<BarChart
    data={data.intro}
    x=year
    y=sales_usd
    series=country
/>

## Grouped Bar Chart
<BarChart
    data={data.intro}
    x=year
    y=sales_usd
    series=country
    type=grouped
/>

## Horizontal Bar Chart

```simple_bar
select 'North' as country, -105 as value
union all
select 'Northwest' as country, 101 as value
union all
select 'South' as country, 113 as value
union all
select 'Southeast' as country, -78 as value
union all
select 'East' as country, 112 as value
union all
select 'West' as country, 103 as value
union all
select 'Southwest' as country, 110 as value
```

<BarChart
    data={data.simple_bar} 
    x=country 
    y=value 
    xAxisTitle=Country 
    yAxisTitle=Value 
    swapXY=true 
    title='Year-to-Date Value by Region' 
    subtitle='South region leading as of June 30/21'
/>

## Scatter Plot

```regions
   select 'West' as region, 59 as score_a, 51 as score_b
   union all
   select 'West', 70 as score_a, 43 as score_b
   union all    
   select 'West', 72 as score_a, 38 as score_b
   union all    
   select 'West', 66 as score_a, 34 as score_b
   union all    
   select 'West', 59 as score_a, 48 as score_b
   union all    
   select 'West', 66 as score_a, 34 as score_b
   union all    
   select 'West', 62 as score_a, 30 as score_b
   union all    
   select 'West', 58 as score_a, 32 as score_b
   union all    
   select 'West', 51 as score_a, 35 as score_b
   union all    
   select 'West', 51 as score_a, 52 as score_b
   union all    
   select 'West', 59 as score_a, 35 as score_b
   union all    
   select 'West', 47 as score_a, 37 as score_b
   union all    
   select 'West', 54 as score_a, 44 as score_b
   union all    
   select 'West', 46 as score_a, 48 as score_b
   union all    
   select 'East', 47 as score_a, 37 as score_b
   union all    
   select 'East', 67 as score_a, 48 as score_b
   union all    
   select 'East', 81 as score_a, 71 as score_b
   union all    
   select 'East', 86 as score_a, 54 as score_b
   union all    
   select 'East', 76 as score_a, 68 as score_b
   union all    
   select 'East', 65 as score_a, 67 as score_b
   union all    
   select 'East', 81 as score_a, 50 as score_b
   union all    
   select 'East', 59 as score_a, 77 as score_b
   union all    
   select 'East', 64 as score_a, 57 as score_b
   union all    
   select 'East', 55 as score_a, 62 as score_b
   union all    
   select 'East', 78 as score_a, 47 as score_b
   union all    
   select 'East', 77 as score_a, 59 as score_b
   union all    
   select 'East', 67 as score_a, 43 as score_b
   union all    
   select 'East', 60 as score_a, 45 as score_b
   union all    
   select 'East', 57 as score_a, 81 as score_b
   union all    
   select 'East', 86 as score_a, 67 as score_b
   union all    
   select 'South', 112 as score_a, 82 as score_b
   union all    
   select 'South', 80 as score_a, 83 as score_b
   union all
   select 'South', 75 as score_a, 85 as score_b
   union all    
   select 'South', 93 as score_a, 55 as score_b
   union all    
   select 'South', 99 as score_a, 81 as score_b
   union all    
   select 'South', 81 as score_a, 53 as score_b
   union all    
   select 'South', 113 as score_a, 86 as score_b
   union all    
   select 'South', 98 as score_a, 103 as score_b
   union all
   select 'South', 84 as score_a, 83 as score_b
   union all    
   select 'South', 91 as score_a, 70 as score_b
   union all    
   select 'South', 120 as score_a, 67 as score_b
   union all    
   select 'South', 75 as score_a, 53 as score_b
   union all    
   select 'South', 97 as score_a, 96 as score_b
   union all    
   select 'South', 99 as score_a, 74 as score_b
   union all    
   select 'South', 83 as score_a, 73 as score_b
```

<ScatterPlot 
    data={data.regions} 
    x=score_a 
    y=score_b 
    series=region 
    xAxisTitle=true 
    yAxisTitle=true 
/>

## Bubble Chart
```region_bubble
    select 'West' as region, 63 as score_a, 51 as score_b, 55 as size
    union all
    select 'West' as region, 61 as score_a, 52 as score_b, 8 as size
    union all    
    select 'West' as region, 69 as score_a, 35 as score_b, 12 as size
    union all
    select 'West' as region, 50 as score_a, 39 as score_b, 28 as size
    union all
    select 'West' as region, 58 as score_a, 49 as score_b, 65 as size
    union all
    select 'West' as region, 59 as score_a, 49 as score_b, 95 as size
    union all
    select 'West' as region, 50 as score_a, 46 as score_b, 31 as size
    union all
    select 'West' as region, 72 as score_a, 34 as score_b, 6 as size
    union all    
    select 'West' as region, 69 as score_a, 54 as score_b, 55 as size
    union all
    select 'West' as region, 46 as score_a, 37 as score_b, 78 as size
    union all
    select 'West' as region, 58 as score_a, 31 as score_b, 16 as size
    union all
    select 'West' as region, 50 as score_a, 31 as score_b, 33 as size
    union all
    select 'West' as region, 71 as score_a, 48 as score_b, 64 as size
    union all
    select 'West' as region, 61 as score_a, 47 as score_b, 89 as size
    union all
    select 'East' as region, 45 as score_a, 39 as score_b, 26 as size
    union all
    select 'East' as region, 68 as score_a, 42 as score_b, 66 as size
    union all
    select 'East' as region, 69 as score_a, 62 as score_b, 30 as size
    union all
    select 'East' as region, 59 as score_a, 44 as score_b, 23 as size
    union all
    select 'East' as region, 86 as score_a, 57 as score_b, 20 as size
    union all
    select 'East' as region, 90 as score_a, 41 as score_b, 43 as size
    union all
    select 'East' as region, 66 as score_a, 60 as score_b, 25 as size
    union all
    select 'East' as region, 70 as score_a, 41 as score_b, 2 as size
    union all    
    select 'East' as region, 59 as score_a, 42 as score_b, 71 as size
    union all
    select 'East' as region, 64 as score_a, 69 as score_b, 84 as size
    union all
    select 'East' as region, 85 as score_a, 84 as score_b, 73 as size
    union all
    select 'East' as region, 77 as score_a, 54 as score_b, 91 as size
    union all
    select 'East' as region, 74 as score_a, 48 as score_b, 52 as size
    union all
    select 'East' as region, 88 as score_a, 44 as score_b, 21 as size
    union all
    select 'East' as region, 84 as score_a, 85 as score_b, 17 as size
    union all
    select 'East' as region, 78 as score_a, 87 as score_b, 99 as size
    union all
    select 'South' as region, 120 as score_a, 69 as score_b, 1 as size
    union all    
    select 'South' as region, 106 as score_a, 74 as score_b, 13 as size
    union all
    select 'South' as region, 117 as score_a, 67 as score_b, 68 as size
    union all
    select 'South' as region, 89 as score_a, 100 as score_b, 36 as size
    union all
    select 'South' as region, 77 as score_a, 65 as score_b, 36 as size
    union all
    select 'South' as region, 100 as score_a, 70 as score_b, 58 as size
    union all
    select 'South' as region, 76 as score_a, 52 as score_b, 27 as size
    union all
    select 'South' as region, 111 as score_a, 81 as score_b, 49 as size
    union all
    select 'South' as region, 92 as score_a, 103 as score_b, 22 as size
    union all
    select 'South' as region, 105 as score_a, 77 as score_b, 71 as size
    union all
    select 'South' as region, 75 as score_a, 89 as score_b, 50 as size
    union all
    select 'South' as region, 104 as score_a, 82 as score_b, 25 as size
    union all
    select 'South' as region, 109 as score_a, 68 as score_b, 85 as size
    union all
    select 'South' as region, 102 as score_a, 88 as score_b, 62 as size
    union all
    select 'South' as region, 82 as score_a, 68 as score_b, 3 as size
```

<BubbleChart 
    data={data.region_bubble} 
    x=score_a 
    y=score_b 
    size=size 
    series=region 
    xAxisTitle=true 
    yAxisTitle=true
/>

## Histogram

<Histogram 
    data={data.region_bubble} 
    x=score_a
/>


## More
Check out the [Evidence Docs](https://docs.evidence.dev/features/charts/examples) for more chart examples.

# Tables & Text

## Data Table
<DataTable
    data={data.intro}
/>


## Text

```us_sales
select *
from ${intro} 
where country = 'US'
order by year desc
```

US sales in the most recent year (<Value data={data.us_sales} column=year/>) were <Value data={data.us_sales} column=sales_usd />

