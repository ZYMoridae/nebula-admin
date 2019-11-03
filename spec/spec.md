
- [Pages](#pages)
  - [Home Page](#home-page)
    - [HomeBanner](#homebanner)
    - [FeaturedProducts](#featuredproducts)
    - [API](#api)
  - [ProductList Page](#productlist-page)
    - [API](#api-1)
  - [ProductInfo Page](#productinfo-page)
    - [API](#api-2)
  - [ShoppingCart Page](#shoppingcart-page)
    - [API](#api-3)
  - [Payment Page](#payment-page)
    - [API](#api-4)

# Pages

## Home Page

### HomeBanner
This component mainly used for displaying promotions recently. All the promotions will be fetched from the API and only active ones will be returned. Only 3-5 promotions are allowed to be showed in the carousel. Each promotion block should have a deep link which redirect user to the relevant page (_Not in the scope at current stage_).

### FeaturedProducts
At the moment, the recent products will feed this part. Three products will be displayed when the page is rendered. A refresh button should be on the top-right of the component. Once user click that button, another group of three products will replace the old one. In order to make it easier at the test phase, products API will return top 9 products from databse. (_Will be implemented by ElasticSearch Search later_)

### API
* **GET** Product
* **GET** HomeBanner

## ProductList Page

### API
* **GET** Product

## ProductInfo Page

### API
* **GET** ProductInfo
* **POST** ShoppingCart

## ShoppingCart Page

### API
* **GET** ShoppingCart
* **POST** ShoppingCart(Finalise)

## Payment Page

### API
* **GET** Order
* **POST** Order(Finalise)
