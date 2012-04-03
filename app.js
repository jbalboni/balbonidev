
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , markdown = require('markdown').markdown
  , fs = require('fs');

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
  //mongoose.connect('mongodb://localhost/balbonidev');
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.helpers({ md: function(text){
  return markdown.toHTML(text);
}, monthName: function(month){
  var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
  return monthNames[month];
}})

// Bootstrap controllers

function bootControllers(app) {
  fs.readdir(__dirname + '/controllers', function(err, files){
    if (err) throw err;
    files.forEach(function(file){
      bootController(app, file);
    });
  });
}

// Example (simplistic) controller support

function bootController(app, file) {
  var name = file.replace('.js', '')
    , controller = require('./controllers/' + name)
    , prefix = '/' + name; 

  // Special case for "app"
  if (name == 'app') prefix = '/';

  Object.keys(controller).map(function(action){
    var fn,custom_route,custom_method;
    if (controller[action].route) {
      fn = controller[action].action;
      custom_route = prefix+controller[action].route;
      custom_method = controller[action].method;
    } else {
      fn = controller[action];
    }
    switch(action) {
      case 'index':
        app.get(prefix, fn);
        break;
      case 'view':
        app.get(prefix + '/:id', fn);
        break;
      case 'add':
        app.all(prefix + '/add', fn);
        break;
      case 'edit':
        app.get(prefix + '/:id/edit', fn);
        break;
      case 'update':
        app.put(prefix + '/:id', fn);
        break;
      case 'destroy':
        app.del(prefix + '/:id', fn);
        break;
      default:
        app[custom_method](custom_route,fn);
    }
  });
}

bootControllers(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
