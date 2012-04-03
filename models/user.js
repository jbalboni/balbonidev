var mongoose = require('mongoose'), Schema = mongoose.Schema;

var User = new Schema({
    userId		: String
  , name		: String
  , hash		: String
  , salt		: String
});

var db = mongoose.connect('mongodb://localhost/balbonidev');

var UserModel = exports.UserModel  = mongoose.model('User', User);