# TaskManager-NodeJs-MongoDB-sample
A TaskManager backend Application with NodeJs and MongoDB with authentication


RUN:
node server.js

TEST
jest --verbose

NOTE:
- Pass x-auth-token in headers for authenticated APIs which is recieved on login API call in response header.

LIBRARIES used:
express - web framework
bcrypt - encrypting password
jsonwebtoken - for genarating auth tokens for individual user
mongodb - database
mongoose - mongodb opertaions library
multer - File operations library
properties-reader - application wide properties conf file
validator - validations
jest - Testing tool
supertest - Testing tool to test Express APIs without making http calls
