'use strict';


// requirements
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const notFoundHandler = require('./middleware/404.js');
const serverErrorHandler = require('./middleware/500.js');

// access control headers
app.all('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  console.log('Requested method ', req.method, ' from url ', req.url);
  next();
});

// global middlewares
app.use(cors()); // cors handler
app.use(express.json(), bodyParser.json(), bodyParser.urlencoded({extended: true}), cookieParser()); // parsing stuff handler
app.use(serverErrorHandler); // error handler

// ---------------------------------------- Routes ---------------------------------------- //

// all crud routes
const v1Router = require('./router.js');
app.use('/api/v1/', v1Router);
app.use('*', notFoundHandler);

// socket implementation?
// const io = require('socket.io')(http, {cookie: false});
// require('./apps/chat.js')(io);
// io.on('connection', (socket) => {
// 	socket.on('notification', msg => {
// 		console.log('socket message: ', msg);
// 	});
// 
// 	socket.on('disconenct', () => {
// 		console.log('user disconnected.');
// 	});
// });
//
// route for notifications
// const notification = require('./routes/notification.js');
// app.use('/', notification) 



module.exports = {
  server: http,
  start: () => {
    let port = process.env.PORT || 3000;
    http.listen(port, () => console.log(`Listening on port ${port}`));
  },
};