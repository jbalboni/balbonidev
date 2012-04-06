var Mailgun = require('mailgun').Mailgun;

exports.index = function(req, res){
  res.render('contact');
};

exports.contact = {route:"/", method: "post", action: function(req, res){
  var mg = new Mailgun('${mailgun_apikey}');
  mg.sendText('site@balbonidev.mailgun.org',
         ['jbalboni@gmail.com'],
         'Balbonidev site: '+req.body.contact_subject,
         req.body.contact_msg,
         function(err) { 
         	if (err) {
         		console.log(err);
         		res.send({result: err});
         	} else {
         		res.send({result: "success"});
         	}
         });
}};