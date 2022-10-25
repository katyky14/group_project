# Buy Ktsy

Buy Ksty is a web application inspired by Etsy, that provides an online marketplace for unique and creative goods. Where users can sell their creative goods or they can buy and review goods made by others users.

[Click here to view Buy Ktsy Live Site](https://buy-ktsy.herokuapp.com/)

This Project is built with:
* Python
* SQLAlchemy
* Flask
* PostgreSQL
* React
* Redux


Buy Ktsy wiki directory:
* [Buy Ktsy features](https://github.com/katyky14/group_project/wiki/Esty-Clone-MVP-Features-List)
* [Database Schema](https://github.com/katyky14/group_project/wiki/Esty-Clone-DB-Schema)


## Run Buy Ktsy Locally

* Clone the main repository of Buy Ktsy
* Open the project root directory, cd into app and run the command pipenv install. Then cd in to react-app and npm install to install the required packages
* Create a .env file similar to the .env example located in teh app folder
* Create the database in the app by running pipenv run flask db migrate, flask upgrade, and flask seed all.
* Then enter the cammand pipenv flask run in the app folde, and npm start in the react-app folder.

## Future Features
* Adding categories for the products to have extra ways to filter the products in this page. 
* Adding orders to the page so users can checkout their items in the cart and track what users are purchasing. 
* Making the products to be likeable for additional ways users can interact with products they are interested in. 

