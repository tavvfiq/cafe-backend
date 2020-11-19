<h1 align="center">Backend For KeCafe Skuy!</h1>
<p>This is the dependency of <a href="https://github.com/tavvfiq/kecafe-skuy">KeCafe Skuy Mobile App</a>. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js.</p> 
<a href="https://en.wikipedia.org/wiki/Express.js">More about expressJS</a>

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.11.x-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost with XAMPP or LAMPP)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp or lampp, etc.
5. Create a database with the name note, and Import file [backend-express.sql](https://github.com/tavvfiq/cafe-backend/blob/master/src/sql/backend_expressjs.sql) to **phpmyadmin**
6. run the server with `npm run server`
7. Open Postman desktop application or Chrome web app extension that has installed before
8. Choose HTTP Method and enter request url.(ex. localhost:3000/)
9. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
HOST = 'localhost'
USERNAME = 'your_mysql_user_admin'
DATABASE = 'your_database_name'
PASSWORD = 'your_mysql_user_password'

API_URL = 'url_deployed_backend'

SECRET_KEY='your_secret_key'
PORT = 'your_port'
```

## Postman Documentation
You can grab the Postman documentation [here](https://documenter.getpostman.com/view/12186383/TVCfW8VT) 
