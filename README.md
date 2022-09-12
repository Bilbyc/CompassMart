<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

<h1 align="center">Compass Mart</h1>
<p align="center">🚀 An Api to create and manage Products in JSON and via CSV Files made for the final <strong>Compass.UOL</strong> scholarship challenge</p><br>

📁 Content Table
=================
<!--ts-->
   * **[Dependencies](#-dependencies)**
   * **[Swagger Documentation](#-swagger-documentation)**
   * **[How to use](#-how-to-use)**
   * **[Endpoints](#-endpoints)**
      * [Create a product](#create-a-product)
      * [Create products from CSV File](#create-products-from-csv-file)
      * [List all products](#list-all-products)
      * [List low stock products](#list-low-stock-products)
      * [Get product by ID](#get-product-by-id)
      * [Update product by ID (PATCH)](#update-product-by-id-patch)
      * [Update product by ID (PUT)](#update-product-by-id-put)
      * [Delete product](#delete-product)
   * **[Author](#-author)**
<!--te-->

🔑 Dependencies
---------------
* [cors: 2.8.5](https://www.npmjs.com/package/cors)
* [dotenv: 16.0.1](https://www.npmjs.com/package/dotenv)
* [express: 4.18.1](http://expressjs.com/)
* [joi: 17.6.0](https://www.npmjs.com/package/joi)
* [mongoose: 6.5.1](https://mongoosejs.com/)
* [mongoose-paginate-v2: 1.7.0](https://www.npmjs.com/package/mongoose-paginate-v2)
* [multer: 1.4.5-lts.1](https://www.npmjs.com/package/multer)<br><br>


📑 Swagger Documentation
---------------
**Acess swagger documentation through the following route**
``` 
/api/v1/api-docs
```

🎲 How to use
---------------

```bash
# Clone this repository
$ git clone https://github.com/Bilbyc/CompassMart.git

# Install dependencies
$ npm install

```
### Set up Database and Port infos (.env)
Create a file named **.env** in the project root directory, copy and paste below content on it and insert your mongodb acess and port infos
```
MONGO_DB_URL =
PORT =
```
**Run application**
```
$ npm run dev
```

📌 Endpoints
============
### Product Endpoints
|       Route                       |    Method    |                   Description                       |                                                             
|   ---------------                 | :----------: |  -------------------------------------------------- |                                                             
|  `/api/v1/product`                |     POST     |  Creates a product                                  | 
|  `/api/v1/product/csv`            |     POST     |  Create one or more products from a CSV file        |
|  `/api/v1/product/low_stock`      |     GET      | List all products with stock quantity below 100     |
|  `/api/v1/product`                |     GET      |  List all of products                               |   
|  `/api/v1/product/:id`            |     GET      |  List the product by its ID                         | 
|  `/api/v1/product/marketplace/:id`|     GET      |  List a product in mapper format                    | 
|  `/api/v1/product/:id`            |     PUT      |  Updates the product by its ID (All fields required)|  
|  `/api/v1/product/:id`            |    PATCH     |  Updates the product by its ID                      |
|  `/api/v1/product/:id`            |    DELETE    |  Deletes the product by its ID                      |

### User Endpoints
|       Route               |    Method    |                   Description                       |                                                             
|   ---------------         | :----------: |  -------------------------------------------------- |                                                             
|  `/api/v1/user`           |     POST     |  Creates a new User                                 | 
|  `/api/v1/authenticate`   |     POST     |  Authenticates a user and receive a auth token      |

    
## ✋🏻 Author
| <img src="https://avatars.githubusercontent.com/Bilbyc" width=115> |
|--------------------------------------------------------------------|
| <a href="https://github.com/Bilbyc">Carlos Bilby</a> |


