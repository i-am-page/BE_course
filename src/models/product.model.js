'use strict'

const mongoose = require('mongoose'); // Erase if already required


const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    product_name:{type:String, required:true},
    product_thumb:{type:String, required:true},
    product_description:String,
    product_price:{type:Number, required:true},
    product_quantity:{type:Number, required:true},
    product_type:{type:String, required:true, enum:['electronic','clothing','furniture']},
    product_shop:{type:mongoose.Schema.Types.ObjectId, ref:'Shop', required:true},
    product_attributes:{type: mongoose.Schema.Types.Mixed, required:true},
},{
    collection: COLLECTION_NAME,
    timestamps: true
});

//define product type = clothing
const clothingShema = new mongoose.Schema({
    brand:{type:String, required:true},
    size:String,
    material:String,

},{
    collection:'clothings',
    timestamps:true
})

//define product type = electronic
const electronicShema = new mongoose.Schema({
    manufacturer:{type:String, required:true},
    model:String,
    color:String, 

},{
    collection:'electronics',
    timestamps:true
})


//Export the model
module.exports ={
    product: mongoose.model(DOCUMENT_NAME, productSchema),
    clothing: mongoose.model('Clothing', clothingShema),
    electronic: mongoose.model('Electronic', electronicShema),
}

