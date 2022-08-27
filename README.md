<h1 align="center">Compass Mart</h1>
<p align="center">🚀 An Api to manage Products from JSON and CSV Files made for the final Compass UOL scholarship challenge</p><br>

Content Table
=================
<!--ts-->
   * [Dependencies](#dependencies)
   * [How to use](#-how-to-use)
   * [Endpoints](#endpoints)
   * [Tecnologies](#tecnologies)
<!--te-->

Dependencies
---------------
* [cors: 2.8.5](https://www.npmjs.com/package/cors)
* [dotenv: 16.0.1](https://www.npmjs.com/package/dotenv)
* [express: 4.18.1](http://expressjs.com/)
* [joi: 17.6.0](https://www.npmjs.com/package/joi)
* [mongoose: 6.5.1](https://mongoosejs.com/)
* [mongoose-paginate-v2: 1.7.0](https://www.npmjs.com/package/mongoose-paginate-v2)
* [multer: 1.4.5-lts.1](https://www.npmjs.com/package/multer)

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
MONGO_DB_URL=
PORT =
```
**Run application**
```
$ npm run dev
```

Endpoints
============
### Product Endpoints
|       Route                  |    Method    |                   Description                       |                                                                   
|   ---------------            | :----------: |  -------------------------------------------------- |                                                                   
|  `/api/v1/product`           |     POST     |  Creates a product                                  | 
|  `/api/v1/product/csv`       |     POST     |  Create one or more products from a CSV file        |
|  `/api/v1/product/low_stock` |     GET      | List all products with stock quantity below 100     |
|  `/api/v1/product`           |     GET      |  List all of products                               |   
|  `/api/v1/product/:id`       |     GET      |  List the product by its ID                         |   
|  `/api/v1/product/:id`       |     PUT      |  Updates the product by its ID (All fields required)|  
|  `/api/v1/product/:id`       |    PATCH     |  Updates the product by its ID                      |
|  `/api/v1/product/:id`       |    DELETE    |  Deletes the product by its ID                      |


## Create a product

### Request

**`POST`** `/api/v1/product`

    {
      "title": "Suprimentos",
      "description": "Açucar 900g",
      "department": "Mercearia",
      "brand": "São Gomes",
      "price": 23.99,
      "qtd_stock": 76,
      "bar_codes": "7891107139536"
    }

### Response

    {
      "title": "Suprimentos",
      "description": "Açucar 900g",
      "department": "Mercearia",
      "brand": "São Gomes",
      "price": 23.99,
      "qtd_stock": 76,
      "stock_control_enabled": true,
      "bar_codes": "7891107139536",
      "_id": "63097f424257eb4a3e46a17f",
      "createdAt": "2022-08-27T02:19:46.883Z",
      "updatedAt": "2022-08-27T02:19:46.883Z"
    }

## Create product(s) from CSV File

### Request

**`POST`** `/api/v1/product/csv`
  
  * Select form-data on Body request type
  * Set KEY name as 'file' and type as File
  * Upload a CSV file based on respective headers `title / description / department / brand / price / qtd_stock / bar_codes`
  
  |       Field       |    Data-type |                                                                  
  | ----------------- | :----------: |                                                                  
  |       title       |    String    |   
  |     description   |    String    |  
  |     department    |    String    | 
  |       brand       |    String    |  
  |       price       |    Float     |   
  |     qtd_stock     |    Integer   |    
  |     bar_codes     |    String    |  
 
 
## List all products

### Request

**`GET`** `/api/v1/product/`
```
   Query Params: offset, brand, department
```   
### Response
```
   "Products": [
        {
            "_id": "63093be7343de5000dc61de7",
            "title": "Saco de Lixo",
            "description": "Saco de Lixo Preto Super Econômico 30 Litros rolo 50 unidades - Embalixo",
            "department": "Embalagens e Descartáveis",
            "brand": "Embalixo",
            "price": 5.99,
            "qtd_stock": 124,
            "stock_control_enabled": true,
            "bar_codes": "2384523439482",
            "createdAt": "2022-08-26T21:32:23.981Z",
            "updatedAt": "2022-08-27T02:48:21.357Z"
        },
        {
            "_id": "63093beb343de5000dc61e1c",
            "title": "Sabonete em Barra",
            "description": "Sabonete em Barra Frésia e Pêssego unidade 85g - Flor de Ypê",
            "department": "ofertas",
            "brand": "Flor de Ypê",
            "price": 1.39,
            "qtd_stock": 563,
            "stock_control_enabled": true,
            "bar_codes": "5185818274211",
            "createdAt": "2022-08-26T21:32:27.974Z",
            "updatedAt": "2022-08-26T21:32:27.974Z"
        }
    ],
    "total": 2,
    "limit": 50,
    "offsets": 1,
    "offset": 1
    }
```
## List low stock products

### Request

**`GET`** `/api/v1/product/low_stock`
```  
   Query Params: offset
```  
### Response
```
   "Products": [
        {
            "_id": "63097f424257eb4a3e46a17f",
            "title": "Suprimentos",
            "description": "Açucar 900g",
            "department": "Mercearia",
            "brand": "São Gomes",
            "price": 23.99,
            "qtd_stock": 76,
            "stock_control_enabled": true,
            "bar_codes": "7891107139536",
            "createdAt": "2022-08-27T02:19:46.883Z",
            "updatedAt": "2022-08-27T02:19:46.883Z"
        },
        {
            "_id": "63093be6343de5000dc61dd0",
            "title": "Leite Condensado",
            "description": "Leite Condensado Semidesnatado tetra pak 395g - Piracanjuba",
            "department": "ofertas",
            "brand": "Piracanjuba",
            "price": 6.44,
            "qtd_stock": 99,
            "stock_control_enabled": true,
            "bar_codes": "4111327936030",
            "createdAt": "2022-08-26T21:32:22.371Z",
            "updatedAt": "2022-08-27T03:22:38.435Z"
        }
    ],
    "total": 2,
    "limit": 50,
    "offsets": 1,
    "offset": 1
    }
```

## Get product by ID

### Request

**`GET`** `/api/v1/product/:id`

### Response

    {
      "_id": "63093bf2343de5000dc61e82",
      "title": "Esponja de Limpeza",
      "description": "Esponja de Limpeza Dupla Face 75x110mm unidade - Alklin",
      "department": "Produtos de Limpeza",
      "brand": "Alklin",
      "price": 0.99,
      "qtd_stock": 2430,
      "stock_control_enabled": true,
      "bar_codes": "9799348754385",
      "createdAt": "2022-08-26T21:32:34.986Z",
      "updatedAt": "2022-08-26T21:32:34.986Z"
    }

## Update product by ID (PATCH)

### Request

**`PATCH`** `/api/v1/product/:id`
  
    {
      "qtd_stock": 97,
      "department": "Mercearia"
    }
  
  ### Response

    {
      "_id": "63093be6343de5000dc61dd0",
      "title": "Leite Condensado",
      "description": "Leite Condensado Semidesnatado tetra pak 395g - Piracanjuba",
      "department": "Mercearia",
      "brand": "Piracanjuba",
      "price": 6.44,
      "qtd_stock": 97,
      "stock_control_enabled": true,
      "bar_codes": "4111327936030",
      "createdAt": "2022-08-26T21:32:22.371Z",
      "updatedAt": "2022-08-27T07:00:51.937Z"
    }
    
## Update product by ID (PUT)

### Request

**`PUT`** `/api/v1/product/:id`
  
    {
      "title": "Suprimentos",
      "description": "Açucar 900g",
      "department": "Mercearia",
      "brand": "São Gomes",
      "price": 23.99,
      "qtd_stock": 76,
      "bar_codes": "7891107139536"
    }
  
  ### Response

    {
      "title": "Suprimentos",
      "description": "Açucar 900g",
      "department": "Mercearia",
      "brand": "São Gomes",
      "price": 23.99,
      "qtd_stock": 76,
      "stock_control_enabled": true,
      "bar_codes": "7891107139536",
      "_id": "63097f424257eb4a3e46a17f",
      "createdAt": "2022-08-27T02:19:46.883Z",
      "updatedAt": "2022-08-27T02:19:46.883Z"
    }
  
  ## Delete product by ID (DELETE)

  ### Request

  **`DELETE`** `/api/v1/product/:id`
  
  ### Response
    
    Status Code: 204 No Content


