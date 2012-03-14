
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Mailgun = require('mailgun').Mailgun;

var app = module.exports = express.createServer();

// Configuration

app.set('view engine', 'jade');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);

app.get('/', function(req, res){
  res.render('index');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.post('/contact', function(req, res){
  var mg = new Mailgun('${mailgun_apikey}');
  mg.sendText('site@balbonidev.mailgun.org',
         ['jbalboni@gmail.com'],
         'Balbonidev site: '+req.body.contact_subject,
         req.body.contact_msg,
         function(err) { err && console.log(err) });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
