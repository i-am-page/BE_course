'use strict'
const { OK, CREATED } = require("../core/success.response")
const ProductService = require("../services/product.service")

class ProductController {
    createProduct = async (req, res, next) => {
        new CREATED({
            message: `Product Created Successfully`,
            metadata: await ProductService.createProduct(req.body.product_type, req.body),
        }).send(res)
    }

    // getProduct = async (req, res, next) => {
    //     new OK({
    //         message: `Product Fetched`,
    //         metadata: await ProductService.getProduct(req.params.id),
    //     }).send(res)
    // }

    // updateProduct = async (req, res, next) => {
    //     new OK({
    //         message: `Product Updated`,
    //         metadata: await ProductService.updateProduct(req.params.id, req.body),
    //     }).send(res)
    // }

    // deleteProduct = async (req, res, next) => {
    //     new OK({
    //         message: `Product Deleted`,
    //         metadata: await ProductService.deleteProduct(req.params.id),
    //     }).send(res)
    // }
}

module.exports = new ProductController()