var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var reclamationsRouter=require('./routes/reclamations')
var mongoose=require("mongoose");
var config=require("./database/db.json");
const Eureka = require('eureka-js-client').Eureka;

mongoose.connect(config.mongo.uri, ()=>{
  console.log("Connected to database");
})

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/reclamations', reclamationsRouter);
app.use('/', indexRouter);

setTimeout(() => {
const client = new Eureka({
  instance: {
    app: 'reclamationservice',
    hostName: 'reclamationwithnode',
    ipAddr: '127.0.0.1',
    port: {
      '$': 3000,
      '@enabled': 'true',
    },
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: 'eureka',
    port: 8084,
    servicePath: '/eureka/apps/',
  },
});

client.logger.level('debug');
client.start((error) => {
  console.log(error || 'complete');
});
}, 5000)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
