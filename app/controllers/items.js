var mongoose = require('mongoose');
var express = require('express');
mongoose.Promise = require('bluebird');
// express router // used to define routes
var itemRouter  = express.Router();
var itemModel = mongoose.model('Item');
var orderModel = mongoose.model('Order');
var responseGenerator = require('./../../libs/responseGenerator');
var discountedPriceGenerator = require('./../../libs/discountedPriceGenerator');
var auth = require("./../../middlewares/auth");


module.exports.controllerFunction = function(app) {


    //Home Page
    itemRouter.get('/all',auth.checkLogin,function(req,res){

      //Begin item model find to get all items
      itemModel.find({},function(err,allItems){
          if(err){
              var myResponse = responseGenerator.generate(true,"Some error"+err,500,null);
              console.log(myResponse);
              res.json(myResponse);
          }
          else{
              if(allItems == null || allItems[0] == undefined)
              {
                  var myResponse = responseGenerator.generate(false,"No items found",404,null);
                  console.log(myResponse);
                  res.json(myResponse);
              }
              else
              {
                  var myResponse = responseGenerator.generate(false,"Fetched items",200,allItems);
                  console.log(myResponse);
                  res.json(myResponse);
              }
          }

      });//end item model find




    });//end home


    //Name api
    app.use('/items', itemRouter);




};//end contoller code
