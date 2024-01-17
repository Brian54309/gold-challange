let orders = require('../Database/orders.json')
const products = require('../Database/products.json')
const users = require('../Database/users.json')

const {formatResponseJSON} = require('../response.js')
const fs = require("fs");
const {loginHandler} = require('../controller/userController.js')


class orderController{

    static getAll(req,res){
        let message = "success";
        console.log(loginHandler.temp_data)
        res.status(200).json(formatResponseJSON(orders, message));
    }
    static purchase(req,res){
        let statusCode=200;
        let messages='success'
        let data=''
        let totalPrice=0;
        let{productid,quantity}=req.body
        let orderid=orders[orders.length-1].orderid+1;

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        if(loginHandler.temp_data===undefined){
            statusCode=401;
            messages='User has not log in yet'
            res.status(statusCode).json(formatResponseJSON(data,messages))
        }
        if(productid.length!==quantity.length){
            let statusCode=406;
            message=`amount of item and quantity entered does not match`;
            return res.status(statusCode).json(formatResponseJSON(data,message))
        }
        for(let c=0;c<productid.length;c++){
            let product = products.find((i)=>i.productid ===productid[c] )
        if(product===undefined){
            statusCode=404;
            message = `Product with id ${id} does not exist`
            return res.status(statusCode).json(formatResponseJSON(data,message))
        }else if(quantity>product.quantity){
            let statusCode=406;
            messages=`Quantity of order exceeds the stock of item ${product.item}`
            return res.status(statusCode).json(formatResponseJSON(data,message))
        }else{
            let price = quantity[c]*product.price
            totalPrice +=price;
        }

    }
        data={
            orderid:orderid,
            userid:loginHandler.temp_data,
            dateOrdered:today.toUTCString(),
            productid:productid,
            quantity:quantity,
            totalPrice:totalPrice,
        }

        orders.push(data)
        fs.writeFileSync("./Database/orders.json",JSON.stringify(orders),"utf-8")
        return res.status(statusCode).json(formatResponseJSON(data))

    }
}


module.exports ={orderController}