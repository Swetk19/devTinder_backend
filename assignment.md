create repository
initialize the repo
node_modules, package.json, package-lock.json
install express
create server
listen to port 7777
write request handler for /test , /hello
install nodemon and update scripts inside package.json

what is middleware?why do we need it ?
how express js basically handle requests behind the scene
difference between app.use and app.all

difference between ~ and ^ ?
what are dependencies?
what is the use of "-g" while npm install

create a free cluster on MongoDB official website (Mongo Atlas)
install Mongoose library
connect your application to the database "Connection-url"/devTinder
call the connectDB function and connect to database before starting application on 3000

create userschema and user Model
create POST/ signup API to add data to database
PUSH some documents using API calls from postman
error handling using try catch

difference between javascript object and json
Add the express.json() middleware to your app
make the signup API dynamic to receive data from the end user

user.findOne with dublicate emailId which object it will return
API :- get user by email
GET/feed :- get all the users from database

explore the mongoose documentation for model methods

explore schema type options from the documentation
create a custom validate function for gender
Add require, min, minlength, lowercase, trim , unique
Add timestamp to the user schema
API level validation on Patch request and post signup API
Install validator
Explore validator  library functions and used it for password , email and so on
never trust req.body

validate signup API
install becrypt package
create passwordhashed using becrypt

create login API compare password and throw error if email password invalid

install cookie parser
send dummy cookie to user
create GET/profile API and check if you get the cookie back
Install jsonwebtoken
In login API after email and password validation create JWT token a send it to a user in cookies
Read the cookie inside your profile api and find the logged in user

