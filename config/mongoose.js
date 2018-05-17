const mongoose = require('mongoose');
const fs = require('fs');

// Database Name 
const dbName = 'mydb-test';

// Connection URL 
const url = 'mongodb://localhost/' + dbName;

// Connect with Mongoose
mongoose.connect(url);

mongoose.Promise = global.Promise;

const modelsPath = __dirname + '/../models/';
fs.readdirSync(modelsPath).forEach((file) => {
    if (file.indexOf('.js') >= 0) {
        console.log(`requiring model ${file} ...`);
        require(modelsPath + '/' + file);
    }
})

// Monitor if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('mongoose is connected');
})