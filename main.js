const express = require('express');
const app = express()
const PORT =3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));

const userRouter = require('./Router/userRouter.js')

const morgan =require('morgan')


const productRouter=require('./Router/productRouter.js')


app.use(express.json());
app.use(express.urlencoded({extended:false}))



app.use(morgan('combined'))

app.get('/',(req,res)=>{
    res.render("index")
})

 
app.use('/users',userRouter)

app.use('/products',productRouter)



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})