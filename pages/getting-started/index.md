# Getting Started

## Editing a Page
Editing in Evidence is fast. Open this markdown file (**`pages/getting-started.md`**) in your editor and try changing some text. Every time you save, your changes will be reflected almost immediately on your page.

## Writing Queries
The panel below is how SQL queries appear in Evidence.

When you are in development mode (running your project locally), queries are shown by default. In production, queries are hidden by default.

In either case, you (or your audience) can hide or show queries using the button up to the right.

```simple_query
select 'orange' as name, 100 as number
union all
select 'banana' as name, 200 as number
union all
select 'apple' as name, 300 as number
```

## Including Data in Text
The sentence below pulls in values from `simple_query`. Take a look at the markdown file in your editor to see how this is done

The first name is <Value data={data.simple_query} column=name/> and the first number is <Value data={data.simple_query} column=number/>.


## Chaining Queries
You can query the results of an existing query by wrapping the query name in **`${ }`**.

For example, we can query the results of the simple query from above:

```subquery
select * from ${simple_query}
where name = 'apple'
```

## [See how to use the data from your queries &rarr;](/getting-started/using-query-results)