<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

<h1 align="center">Compass Mart</h1>
<p align="center">🚀 An Api to create and manage Products in JSON and via CSV Files made for the final <strong>Compass.UOL</strong> scholarship challenge</p><br>

📁 Content Table
=================
<!--ts-->
   * **[Dependencies](#-dependencies)**
   * **[Heroku App](#-heroku-app)**
   * **[Swagger Documentation](#-swagger-documentation)**
   * **[How to use](#-how-to-use)**
   * **[Endpoints](#-endpoints)**
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
* [multer: 1.4.5-lts.1](https://www.npmjs.com/package/multer)
* bcrypt": 5.0.1
* swagger-ui-express: 4.5.0
* winston: 3.8.2
* jsonwebtoken: 8.5.1,
* morgan: 1.10.0<br><br>

🔮 Heroku App
--------------
**Acess CompassMart online app via:**

[Compass Mart](https://compass-mart-challenge-5.herokuapp.com/)
<br><br>


📑 Swagger Documentation
---------------
**Acess swagger documentation through the following route**
``` 
/api/v1/api-docs
```
**or through the following [link](https://compass-mart-challenge-5.herokuapp.com/api/v1/api-docs/)**

<br>

🎲 How to use
---------------

```bash
# Clone this repository
$ git clone https://github.com/Bilbyc/CompassMart-Challenge-5.git

# Access project root folder
$ cd compassmart-challenge-5

# Install dependencies
$ npm install

```
### Set up Database and Port infos (.env)
**For development mode**

Create a file named **.env** in the project root directory, copy and paste below content on it and insert your mongodb acess and port infos (default port is 3000)
```
MONGO_DB_URL =
PORT =
CHAVE_JWT =     
```
**For running tests**

Create a file named **.env.test** in the project root directory, copy and paste below content on it and insert your mongodb acess and port infos

*Tests creates and then **erases** all data from the database inserted here, so dont use the same one for running tests and development*
```
MONGO_DB_URL =    
PORT =
CHAVE_JWT =     
```
**Run application**
```
$ npm run dev
or
$ npm run test
```
Obs: Theres also a *.env.example* file inside project root directory you can freely use


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


