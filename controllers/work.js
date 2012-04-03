var mongoose = require('mongoose')
  , WorkModel = require('../models/work').WorkModel;

exports.index = function(req, res){
  WorkModel.find({},function(err, docs) {
    res.render('work/index',{items: docs});
  }).sort("date",-1);
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
    res.render('work/form', {work: {}});
  }
};

exports.edit = function(req, res){
  WorkModel.findOne({workId: req.params.workId},function(err, doc) {
    res.render('work/form',{work: doc});
  });
};

exports.update = function(req, res){
  WorkModel.update({workId: req.params.workId},req.body.work,null,function(err, numAffected) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated!");
    }
    res.redirect('/work');
  });
};

exports.view = function(req, res){
  WorkModel.findOne({workId: req.params.workId},function(err, doc) {
    res.render('work/view',{item: doc});
  });
};