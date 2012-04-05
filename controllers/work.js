var mongoose = require('mongoose')
  , WorkModel = require('../models/work').WorkModel;

exports.index = function(req, res){
  WorkModel.find({},null,{ sort: { "date":-1 } },function(err, docs) {
    res.render('work/index',{items: docs});
  });
};

exports.add = function(req, res){
  if (req.method === "POST") {
    WorkModel.create(req.body.work,function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Created!");
      }
      res.redirect('/work');
    })
  } else {
    res.render('work/form', {work: {images:[{},{}]}});
  }
};

exports.edit = function(req, res){
  WorkModel.findOne({workId: req.params.id},function(err, doc) {
    if (doc.images.length == 0) {
      doc.images.push({});
      doc.images.push({});
    } else if (doc.images.length == 1) {
      doc.images.push({});
    }
    res.render('work/form',{work: doc});
  });
};

exports.update = function(req, res){
  WorkModel.update({workId: req.params.id},req.body.work,null,function(err, numAffected) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated!");
    }
    res.redirect('/work');
  });
};

exports.view = function(req, res){
  WorkModel.findOne({workId: req.params.id},function(err, doc) {
    res.render('work/view',{item: doc});
  });
};