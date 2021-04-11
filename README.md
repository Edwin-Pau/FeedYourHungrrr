
# FeedYourHungrrr
# Team U10
## 1. Name
Edwin Pau, Lucas Gong

## 2. Summary  
Our web app is an online catelog for local restaurants. The hospitality industry has been devastated by COVID-19 and restaurants have been reliant on high-fee services such as DoorDash and SkipTheDishes.  

We aim to offer a free platform where restaurant owners can advertise their restaurants online and post their menus for their customers to see.  

On the admin page, a restaurant manager is able to register the information of their menus on our app. The information would include their food items and food prices. On the menu page, customers can find more information about the restaurant and their menu. Restaurant managers must log in using the login page to acquire the proper authentication to create new restaurants and menu items.

## 3. Swagger API Documentation  
**API Docs:** https://app.swaggerhub.com/apis-docs/FeedYourHungrrr/FeedYourHungrrr/1.0.0#/

## 4. Project Deliverables

### 1. API Samples  
 1. https://feedyourhungrrr.herokuapp.com/api/v1/stats  
    **method**: GET  

 2. https://feedyourhungrrr.herokuapp.com/api/v1/users/signup  
    **method**: POST  
    **body**: `{ "username": "edwin101", "password": "password" }`  

 3. https://feedyourhungrrr.herokuapp.com/api/v1/users/login
    **method**: POST  
    **body**: `{ "username": "edwin101", "password": "password" }`  

 4. https://feedyourhungrrr.herokuapp.com/api/v1/restaurants
    **method**: GET  

 5. https://feedyourhungrrr.herokuapp.com/api/v1/restaurants/me  
    **method**: GET   
    **header**: `{ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE4MTQ0MzQxfQ.T4k-FgJ3nR1fJL_LqutrXLma9ZunxKsZzxJcSD6Qpuo" }`  

 6. https://feedyourhungrrr.herokuapp.com/api/v1/restaurants/  
    **method**: POST  
    **header**: `{ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE4MTQ0MzQxfQ.T4k-FgJ3nR1fJL_LqutrXLma9ZunxKsZzxJcSD6Qpuo" }`  
    **body**: `{ "name": "restaurant name", "desc": "best restaurant" }`  

 7. https://feedyourhungrrr.herokuapp.com/api/v1/restaurants/  
    **method**: PUT  
    **header**: `{ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE4MTQ0MzQxfQ.T4k-FgJ3nR1fJL_LqutrXLma9ZunxKsZzxJcSD6Qpuo" }`  
    **body**: `{ "id": 2, "name": "restaurant name 111", "description": "best restaurant ever 111" }`  

 8. https://feedyourhungrrr.herokuapp.com/api/v1/restaurants/  
    **method**: DELETE  
    **header**: `{ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE4MTQ0MzQxfQ.T4k-FgJ3nR1fJL_LqutrXLma9ZunxKsZzxJcSD6Qpuo" }`  
    **body**: `{ "id": 2 }`  

 9. https://feedyourhungrrr.herokuapp.com/api/v1/items
    **method**: GET  
    **header**: `{ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE4MTQ0MzQxfQ.T4k-FgJ3nR1fJL_LqutrXLma9ZunxKsZzxJcSD6Qpuo" }`  
    **query**: `{ "id": 3 }`  

 10. https://feedyourhungrrr.herokuapp.com/api/v1/items
    **method**: POST  
    **header**: `{ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE4MTQ0MzQxfQ.T4k-FgJ3nR1fJL_LqutrXLma9ZunxKsZzxJcSD6Qpuo" }`  
    **body**: `{ "itemName": "apples", "itemPrice": 1.22, "restaurantID": 3 }`  

### 2. Client URL  
https://feedyourhungrrr-client.herokuapp.com/

### 3. Admin Login Credentials
username: admin  
password: hello123  

login: https://feedyourhungrrr-client.herokuapp.com/admin.html  
stats: https://feedyourhungrrr-client.herokuapp.com/stats.html  

### 4. Server URL  
https://feedyourhungrrr.herokuapp.com/

### 5. GitHub
Front-end folder - https://github.com/Edwin-Pau/comp4537-project/tree/frontend  
Back-end folder - https://github.com/Edwin-Pau/comp4537-project/tree/backend
