var mongoose = require('mongoose');
var express = require('express');

// express router // used to define routes
var orderRouter  = express.Router();
var orderModel = mongoose.model('Order');
var userModel = mongoose.model('User');
mongoose.Promise = require('bluebird');
var responseGenerator = require('./../../libs/responseGenerator');
var orderNumberGenerator = require('gen-id')('nnnnnnnc');
var priceGenerator = require('./../../libs/priceGenerator');
var auth = require("./../../middlewares/auth");


module.exports.controllerFunction = function(app) {

    //Get all cart items made by user
    orderRouter.get('/all',auth.checkLogin,function(req,res){

        //begin order model  find
        orderModel.find({'user_id':req.session.user._id},function(err,allOrders){
            if(err){
                var myResponse = responseGenerator.generate(true,"some error"+err,500,null);
                console.log(myResponse);
                res.json(myResponse);
            }
            else{
                if(allOrders == null || allOrders.length == 0)
                {
                    var myResponse = responseGenerator.generate(false,"No orders found",200,allOrders);
                    console.log(myResponse);
                    res.json(myResponse);
                }
                else
                {
                    var myResponse = responseGenerator.generate(false,"Fetched orders",200,allOrders);
                    console.log(myResponse);
                    res.json(myResponse);
                }

            }

        });//end order model find

    });//end get cart items

    //Add to Cart
    app.get('/cart/all',auth.checkLogin,function(req,res){

      var myResponse = responseGenerator.generate(false,"fetched cart items",200,req.session.items);
      console.log(myResponse);
      res.json(myResponse);

    });//end add to cart


    //Add to Cart
    app.post('/cart/add',auth.checkLogin,function(req,res){

        //Verify body parameters
        if(req.body.itemName!=undefined && req.body.imageUrl!=undefined && req.body.itemDescription!=undefined && req.body.itemBrand!=undefined && req.body.price!=undefined){

            var myResponse = responseGenerator.generate(false,"added cart items",200,null);
            console.log(myResponse);
            req.session.items.push(req.body);
            console.log(req.session.items);
            res.json(myResponse);
        }
        else{

            var myResponse = {
                error: true,
                message: "Some body parameter is missing",
                status: 403,
                data: null
            };
            console.log(myResponse);

            res.json(myResponse);

        }


    });//end add to cart





    //Add to Cart
    orderRouter.post('/add',auth.checkLogin,function(req,res){

        for(var i=0;i<req.session.items.length;i++){
          req.session.items[i].user_id = req.session.user._id;
          req.session.items[i]._id = null;
          var order = new orderModel(req.session.items[i]);
          console.log(order);
          order.save(function(err,success){
            if(err){
              var myResponse = responseGenerator.generate(true,err.message,500,null);
              console.log(myResponse);
              res.json(myResponse);
            }
            if(i==req.session.items.length){
              req.session.items=[];
              var myResponse = responseGenerator.generate(false,"Generated Orders",200,null);
              console.log(myResponse);
              res.json(myResponse);
            }
          });
        }


    });


    orderRouter.post('/:orderId/delete',auth.checkLogin,function(req,res){

        //Begin cart item remove
        orderModel.remove({'_id':req.params.orderId},function(err,item){
            if(err){
                var myResponse = responseGenerator.generate(true,"Some error.Check Id"+err,500,null);
                console.log(myResponse);
                res.json(myResponse);
             }
            else
            {
                var myResponse = responseGenerator.generate(false,"Successfully deleted order",200,item);
                console.log(myResponse);
                res.json(myResponse);
            }
        });//end cart remove

    });



    app.use('/orders', orderRouter);




};
