const express = require('express');
const orderRouter = express.Router()
const {orderController} = require('../controller/orderController.js')
const {loginHandler} = require('../controller/userController.js')
orderRouter.use(function timeLog(req,res,next){
    console.log(`time:`, Date.now())
    next()
})

orderRouter
.route('/')
.get(orderController.getAll)
.post(orderController.purchase)
module.exports = orderRouter
orderRouter
.route('/:id')
.get(orderController.getById)
.put(orderController.failOrderById)