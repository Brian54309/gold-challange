const express = require('express');
const productRouter = express.Router()
const {ProductController} = require('../controller/productController.js')


productRouter.use(function timeLog(req,res,next){
    console.log(`time:`, Date.now())
    next()
})


productRouter
.route('/')
.get(ProductController.getAll)
.post(ProductController.addItem)

productRouter
.route('/:id')
.get(ProductController.getById)
.delete(ProductController.deleteItem)
.put(ProductController.updateProduct)
module.exports = productRouter