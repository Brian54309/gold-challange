const express = require('express');
const app = express()
const PORT =3000;
app.use(express.static("public"));

const userRouter = require('./Router/userRouter.js')
const productRouter=require('./Router/productRouter.js');
const orderRouter = require('./Router/orderRouter.js')

const morgan =require('morgan')





app.use(express.json());
app.use(express.urlencoded({extended:false}))



app.use(morgan('combined'))

app.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to homepage'})
})

 
app.use('/users',userRouter)

app.use('/products',productRouter)

app.use('/orders',orderRouter)

app.use(function(req,res,next){
    res.status(404).json({message:'Path entered does not exist'})
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})