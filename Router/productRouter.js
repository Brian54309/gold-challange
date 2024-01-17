const express = require('express');
const productRouter = express.Router()
const {ProductController} = require('../controller/productController.js')


productRouter.use(function timeLog(req,res,next){
    console.log(`time:`, Date.now())
    next()
})

productRouter
.route('/addItem')
.post(ProductController.addItem)

productRouter
.route('/')
.get(ProductController.getAll)
.delete(ProductController.deleteItem)



module.exports = productRouter