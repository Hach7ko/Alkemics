<br>

-> ![Alt text](http://www.alkemics.com/fr/wp-content/uploads/sites/2/2015/06/logo-alkemics.png =300x) <-

<br>

Product data visualization
=========================

The goal of this exercice is to create an application to explore and analyze products.

## Data
```products.json``` contains a set of products

## Features
The application is splitted in 2 parts: visualization and exploration

# Exploration
- A table displays all products
- You can sort products by name, brand, quantityNormalized, certified
- You can filter products by name, brand, quantityNormalized, certified
- No pagination
- Number of products is displayed
- Filters are live (no form validation)

# Visualization
- 3 graphs - use the chart you want (bar, disc, streamgraph, ...)
  - Products by brand
  - Products by weight (quantityNormalized)
    - 0 to 200
    - 250 to 500
    - 500 to 1000
    - more than 1000
  - Products by certified
    - 1: product is "Accepted"
    - 2: product is "Certified"
    - 5: product is "Attributed"
- Click on the graph will re-display exploration part with the correct filter.

## Tools
All libraries are accepted, it's totally free.
