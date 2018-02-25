var mongoose = require('mongoose');
var express = require('express');
mongoose.Promise = require('bluebird');

// express router // used to define routes
var userRouter  = express.Router();
var userModel = mongoose.model('User');
var orderModel = mongoose.model('Order');
var responseGenerator = require('./../../libs/responseGenerator');
var auth = require("./../../middlewares/auth");
var check = require("./../../middlewares/check");


module.exports.controllerFunction = function(app) {


    userRouter.get('/logout',auth.checkLogin,function(req,res){

      //Destroy session
      req.session.destroy(function(err) {

        res.redirect('/');

      });

    });//end logout




    //Signup
    userRouter.post('/signup',check.emailCheck,function(req,res){

        //Verify body parameters
        if(req.body.firstName!=undefined && req.body.lastName!=undefined && req.body.email!=undefined && req.body.password!=undefined){

            var newUser = new userModel({
                userName            : req.body.firstName+''+req.body.lastName,
                firstName           : req.body.firstName,
                lastName            : req.body.lastName,
                email               : req.body.email,
                mobileNumber        : req.body.mobile,
                password            : req.body.password,
                billingAddress      : req.body.billingAddress


            });// end new user

            //Save user
            newUser.save(function(err){
                if(err){

                    var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                    console.log(myResponse);
                    res.json(myResponse);

                }
                else{

                   var myResponse = responseGenerator.generate(false,"Signup Up Successfully",200,newUser);
                   console.log(myResponse);
                   req.session.user = newUser;
                   delete req.session.user.password;
                   res.json(myResponse);
                }

            });//end new user save


        }
        else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };

            //res.send(myResponse);
            console.log(myResponse);
            res.json(myResponse);

        }


    });//end signup


    //Login
    userRouter.post('/login',function(req,res){

        //begin user find
        userModel.findOne({$and:[{'email':req.body.email},{'password':req.body.password}]},function(err,foundUser){
            if(err){
                var myResponse = responseGenerator.generate(true,"Some error occurred",500,null);
                console.log(myResponse);
                //res.send(myResponse);
                res.json(myResponse);

            }
            else if(foundUser==null || foundUser==undefined || foundUser.userName==undefined){

                var myResponse = responseGenerator.generate(true,"User not found. Check your email and password",404,null);
                console.log(myResponse);
                //res.send(myResponse);
                req.session.error='Invalid Email Id or Password.Try Again';
                res.json(myResponse);

            }
            else{
                  var myResponse = responseGenerator.generate(false,"Login Successfull",200,foundUser);
                  console.log(myResponse);
                  req.session.user = foundUser;
                  req.session.items = [];
                  delete req.session.user.password;
                  res.json(myResponse);

            }

        });// end find


    });//end login





    //Get my account details
    userRouter.get('/me',auth.checkLogin,function(req,res){
        if(req.user)
          var user = req.user;
        else
          var user = req.session.user;
        var myResponse = responseGenerator.generate(false,"Successfully found user",200,user);
        console.log(myResponse);
        res.json(myResponse);


    });//end get my account details


    //name api
    app.use('/', userRouter);




};//end contoller code
