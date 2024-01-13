const express = require('express');
const userRouter = express.Router()
const {formatResponseJSON} = require('../response.js')
const {users} = require("../Database/users.json")
const {UserController} = require('../controller/userController.js')



userRouter.use(function timeLog(req,res,next){
    console.log(`time:`, Date.now())
    next()
})

userRouter
.route('/login')
.get((req,res)=>{
    res.render('login')
})
.post(UserController.logIn)

userRouter
.route('/logout')
.get(UserController.logOut)

userRouter
.route('/register')
.get((req,res)=>{
    res.render('register');
})
.post(UserController.register)

userRouter
    .route('/')
    .get(UserController.getAll);


userRouter
    .route('/:userid')
    .get(UserController.getById)
    .delete(UserController.deleteUser)

module.exports = userRouter