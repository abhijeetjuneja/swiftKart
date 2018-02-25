// defining a mongoose schema
// including the module
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// declare schema object.
var Schema = mongoose.Schema;

var orderSchema = new Schema({

	billingAddress		   : {type:Number,default:''},
	confirmationNumber   : {type:Number,default:''},
	deliveredBy			     : {type:Boolean,default:''},
	deliveryType		     : {type:String,default:'COD'},
	discount			       : {type:Number,default:''},
	imageUrl  			     : {type:String,default:''},
	isGift				       : {type:Boolean,default:false},
	itemBrand			       : {type:String,default:''},
	itemDescription		   : {type:String,default:''},
	itemName  			     : {type:String,default:'',required:true},
	manufacturer		     : {type:String,default:''},
	offers				       : {type:String,default:''},
	orderDate			       : {type:Date,default:''},
	orderNumber			     : {type:String,default:''},
	orderStatus			     : {type:String,default:''},
	paymentMethod		     : {type:String,default:''},
	price	  			       : {type:Number,default:''},
	quantity			       : {type:Number,default:1},
	totalPrice	  		   : {type:Number,default:''},
	user_id		  		     : {type:String,default:''},

});


mongoose.model('Order',orderSchema);
