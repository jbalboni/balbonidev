var mongoose = require('mongoose'), Schema = mongoose.Schema;

var Work = new Schema({
    title     : String
  , workId    : { type: String, index: { unique: true } }
  , body      : String
  , date      : Date
  , images    : [{ name: String, caption: String}]
  , link      : { type: String, lowercase: true }
  , source    : { type: String, lowercase: true }
});

var db = mongoose.connect('mongodb://localhost/balbonidev');

var WorkModel = exports.WorkModel  = mongoose.model('Work', Work);