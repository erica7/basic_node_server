# basic_node_server

## Develop

Clone the repo locally. Run `npm install` and `node app.js`.

## Description
This is a basic back-end for an API consisting of users, posts, and comments. Users are able to log in and log out, and are only able to edit data they 'own'. 

It is build on Node with Express. Data is stored in a Mongo database with Mongoose acting as the ORM. Relationships between documents are represented as references rather than embeded documents. 

Routing is RESTful. 

Authentication is controlled with the help of express-session.

## TODO
- [ ] Pagination 
- [ ] Testing 
- [ ] Seed data 