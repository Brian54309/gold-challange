const express = require('express');
const userRouter = express.Router()
const {UserController} = require('../controller/userController.js')
const {loginHandler} = require('../controller/userController.js')



userRouter.use(function timeLog(req,res,next){
    console.log(`time:`, Date.now())
    next()
})

userRouter
.route('/login')
.get((req,res)=>{
    res.render('login')
})
.post(loginHandler.logIn)

userRouter
.route('/logout')
.get(loginHandler.logOut)

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
    .put(UserController.updateUser);

module.exports = userRouter