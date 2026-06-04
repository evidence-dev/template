# Evidence Template Project

This is a template project for getting started with Evidence Studio.

The latest version of Evidence has some key changes to be better compatible with modern dev workflows and agents:
1. The docs are now hosted at https://docs.evidence.studio
2. You run the [Evidence CLI](https://docs.evidence.studio/cli) to start the dev server, validate syntax, retrieve docs etc. Run `evidence help` to see all commands.
3. The syntax has changed:
  a. Components are markdoc style {% table data="demo.daily_orders" /%}
  b. SQL now runs ClickHouse SQL, unless you are using a direct connector, in which case it runs native SQL for your warehouse
4. Sample data is available, run `evidence tables` to see it.

## Install Evidence CLI
### MacOS / Linux
```shell
curl -fsSL https://evidence.studio/install.sh | sh 
```
### Windows
```powershell
irm https://evidence.studio/install.ps1 | iex
```



## Example: Sample Data

````markdown
# Orders by Month

{% dropdown data="demo.daily_orders" id="category" value_column="category" /%}

{% table
  data="demo.daily_orders"
  filters=["category"]
/%}
````

## Example: Inline Data

````markdown

```sql item_sales
select 223 as sales, 'Widgets' as product
union all
select 498 as sales, 'Gizmos' as product
union all
select 354 as sales, 'Thingys' as product
```

# Product Sales

{% bar_chart
  data="item_sales"
  x="product"
  y="sum(sales)"
  order="sum(sales) desc"
/%}

````

## Credentials
Credentials for direct connectors live in connection.yaml in the project root. If connection.yaml is not specified the Evidence Warehouse will be used.
