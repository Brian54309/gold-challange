let orders = require('../Database/orders.json')
let {User,userlogin,Product,Order}= require('../models')

const {formatResponseJSON} = require('../response.js')
const {loginHandler} = require('../controller/userController.js')


class orderController{

    static async getAll(req,res){
        let message='success'
        const order = await Order.findAll()
        return res.status(200).json(formatResponseJSON(order, message));
    }
    static async getById(req,res){
        let id = +req.params.id
        let product=[]
        console.log(id)
        try{
            let order = await Order.findOne({where:
            {id,
            }})
            let user = await User.findOne({where:{
                id:order.dataValues.userid
            }})
            order.user=user.dataValues;
            let productList=order.dataValues.productid;
            console.log(productList)
            for(let i=0;i in productList;i++){
                product.push(await Product.findOne({where:{
                    id:productList[i]
                }}
                ))
                }
                order.product = product
                if(!order){
                    throw new Error('Order is not found')
                }
                return res.status(200).json({data:order,dataUser:order.user,dataProdut:order.product})

            }catch(error){
            return res.status(404).json({message:error.message})
        }
    }

    

    static async purchase(req,res){
        let totalPrice=0;
        let status='order successful'
        let{productid,quantity}=req.body
        try{
            let user = await userlogin.findAll()
            let product = await Product.findAll(
                {where:{
                    id:productid,
                }})
            if(user.length===0){
                throw new Error('User has not login yet')
            }
            if(!product){
                throw new Error('Product selected does not exist')
            }
            for(var i in product){
                totalPrice+=product[i].price*quantity[i]
                let finalQuantity=product[i].stocks-quantity[i]
                await Product.update({stocks:finalQuantity},{where:
                {id:product[i].id}})
            }
            await Order.create({userid:user[0].userid,productid:productid,quantity:quantity,totalPrice:totalPrice,status:status})
            return res.status(200).json({message:'Order successfully placed'})
        }catch(error){
            return res.status(406).json({message:error.message})
        }


        

    }
    static async failOrderById(req,res){
        let id = +req.params.id;
        try{
        let order = await Order.findOne({where:{id}})
        if(!order){
            throw new Error('Order is not found')
        }
        if(order.dataValues.status==='fail'){
            throw new Error('Order status is failed')
        }

        await Order.update({status:'failed'},{where:{id}})
        let productList=order.dataValues.productid
        
        for(let i=0;i in productList;i++){
            let product = await Product.findOne({where:{
                id:productList[i]

            }})
            let finalQuantity=product.stocks+order.dataValues.quantity[i]
            await Product.update({stocks:finalQuantity},{where:{
                id:productList[i]
            }})
        }
        return res.status(200).json({message:'Order status has been updated'})
    }catch(error){
        return res.status(406).json({message:error.message})
    }
        
    }
}

module.exports ={orderController}