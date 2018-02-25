var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var responseGenerator = require('./../libs/responseGenerator');


exports.emailCheck = function(req,res,next){

  //begin user find
  userModel.findOne({'email':req.body.email},function(err,foundUser){
      if(err){
          var myResponse = responseGenerator.generate(true,"Some error occurred",500,null);
          console.log(myResponse);
          //res.send(myResponse);
          res.json(myResponse);

      }
      else if(foundUser==null || foundUser==undefined || foundUser.userName==undefined){

          next();

      }
      else{
          var myResponse = responseGenerator.generate(true,"Email exists",403,null);
          console.log(myResponse);
          res.json(myResponse);
      }

  });// end find


};// end checkLogin
