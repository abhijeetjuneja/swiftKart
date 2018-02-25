var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var responseGenerator = require('./../libs/responseGenerator');


// app level middleware to set request user

exports.setLoggedInUser = function(req,res,next){

	if(req.session && req.session.user){
		userModel.findOne({'email':req.session.user.email},function(err,user){

			if(user){
				req.user = user;
				delete req.user.password;
				req.session.user = user;
				delete req.session.user.password;
				next();
			}
			else{
				// do nothing , because this is just to set the values
			}
		});
	}
	else{
		next();
	}


};//


exports.checkLogin = function(req,res,next){
	if(!req.user && !req.session.user){
		var myResponse = responseGenerator.generate(true,"User not logged in",404,null);
		res.json(myResponse);
	}
	else{

		next();
	}

};// end checkLogin