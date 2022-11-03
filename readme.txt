address book api functions

I have created this API with the help of JavaScript, Node js, express, mongodb and jwt authentication

##Fucntions

1. There are two model in this API 
   a. contact model => in  contact model there are three fields name, phone number and email
   b. user model => in user model there are five fields username, password, phone, email and user type

2. There are two route file 
   a. user route => it includes route for signup and login
   b. contact route => it includes route
       1. get route => we can get the contacts with jwt token without token we can not get data 
       2. get paginition => we can get data with paginition of limit 5 with jwt token
       3. get by id => we can get data by id with jwt token
       4. post => we can post data
       5. delete => we can delete data
       6. put => we can update data


  