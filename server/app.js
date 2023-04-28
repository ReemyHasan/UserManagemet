const express = require('express');
const connectDB = require('./db')
const users = require('./routes/users');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    next();
  });

app.use('/api', users);


connectDB();


const port = 5000;
app.listen(port, () => {
    console.log("API server started on port 5000");
})