'use strict'

const { BadRequestError } = require('../core/error.response');
const { product, clothing, electronic } = require('../models/product.model');

//define factory class to create product

class ProductFactory {
    /*
        type:'',
        payload
    */
    static async createProduct(type,payload) {
        switch(type){
            case 'clothing':
                return await new Clothing(payload).createProduct()
            case 'electronic':
                return await new Electronic(payload).createProduct()
            default:
                throw new BadRequestError(`[ERROR]::Invalid product type ${type}`)
        }
    }
}

//define base class for product
class Product {
    constructor({ product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes }) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    //create new product
    async createProduct(){
        return await product.create(this)
    }
}

//define subclass for different product type = clothing
class Clothing extends Product {
    //create new clothing
    async createProduct(){
        const newClothing = await clothing.create(this.product_attributes)
        if(!newClothing){
            throw new BadRequestError('[ERROR]::Failed to create new clothing')
        }
        const newProduct = await super.createProduct() 
        if(!newProduct){
            throw new BadRequestError('[ERROR]::Failed to create new product')
        }
        return newProduct
    }
}

//define subclass for different product type = electronic
class Electronic extends Product {
    //create new electronic
    async createProduct(){
        const newElectronic = await electronic.create(this.product_attributes)
        if(!newElectronic){
            throw new BadRequestError('[ERROR]::Failed to create new electronic')
        }
        const newProduct = await super.createProduct() 
        if(!newProduct){
            throw new BadRequestError('[ERROR]::Failed to create new product')
        }
        return newProduct
    }
}

module.exports = ProductFactory
