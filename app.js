// Express is an unopinionated, minimalist framework for Node.js 
const express = require('express');
// Body-Parser is a body parsing middleware that parses incoming request bodies, available in `req.body` property, in a middleware before handlers
const bp = require('body-parser');
// Express-Session is a middleware that manages sessions in Express applications 
const session = require('express-session');

const port = 3000;

const app = express();

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bp.json());
app.use(session({
    secret: 'ReallyGoodSecret'
}))

require('./config/mongoose.js');
require('./config/routes.js')(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})