const express = require('express');
const userRouter = express.Router()
const {UserController,loginHandler} = require('../controller/userController.js')




userRouter.use(function timeLog(req,res,next){
    console.log(`time:`, Date.now())
    next()
})

userRouter
.route('/login')
.post(loginHandler.logIn)

userRouter
    .route('/logout')
    //Note: Logout bisa dibuat put / patch / post saja jangan get
.get(loginHandler.logOut)



userRouter
    .route('/')
    .get(UserController.getAll)
    .post(UserController.register);
    


userRouter
    .route('/:userid')
    .get(UserController.getById)
    .delete(UserController.deleteUser)
    .put(UserController.updateUser);

module.exports = userRouter