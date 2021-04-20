# BooksApi
REST API created in NodeJs using Express for Displaying,Storing,Updating Books Records stored on MongoDB.

### Technology Stack Used
1. NodeJS **(Express)**

### Packages Used
1. Express ```npm install --save express ```
2. dotenv  ```npm install --save dotenv```
3. mongoose ```npm install --save mongoose```
4. jsonwebtoken ```npm install jsonwebtoken```
5. nodemon ```npm install --save-dev nodemon```

### How to use
1. First, install all the dependencies using npm install
2. Edit package.json
```json
    "scripts": {
    "start": "nodemon index.js"
    }
```
3. Then Create a .env file, and add
```yml
USER_NAME: admin
PASSWORD: admin123
ACCESS_TOKEN_SECRET: UNIQUE_KEY
```
4. To create unique key, open terminal and type node, then,
```node
require('crypto').randomBytes(16).toString('hex')
```
5. To start the Server
```console
npm start
```
6. You need to have jwt token to add books, update records, and delete records.
7. To get the JWT Token. 
* Make a POST Request to /login, which will return accessToken, this will expire in 30 minutes. 
* Add Authorization in Header section to make POST Requests. 
```javascript
  "authorization": "Bearer ${token}" 
```
