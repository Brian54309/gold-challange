let products = require('../Database/products.json')
const {formatResponseJSON} = require('../response.js')
const fs = require("fs");

class ProductController{
    static getAll(req, res){
        let message = "success";
        res.status(200).json(formatResponseJSON(products, message));
    }
    static addItem(req,res){
        let data={
            productid:products[products.length-1].productid+1,
            item:req.body.item,
            price:req.body.price,
            stocks:req.body.stocks
        }
        products.push(data);
        fs.writeFileSync("./Database/products.json",JSON.stringify(products),"utf-8")
    }
    static deleteItem(req,res){
        let id = +req.params.productidid;
        let statusCode = 200;

        const data = products.find((i)=>i.id === +id);

        if(data===undefined){
            statusCode=404;
            message = `Product with id ${id} does not exist`
            return res.status(statusCode).json(formatResponseJSON(data,message))
        }
        let newProduct = products.filter((data)=> data.id !=id);
        fs.writeFileSync('../Database/products.json',JSON.stringify(newProduct),"utf-8")
        return res.status(201).json(formatResponseJSON(data))

    }
    static updateProduct(req,res){
        let id = +req.params.productid
        let statusCode=200;

        const data = products.find((i)=>i.productid.id===+id)
        if(data===undefined){
            statusCode=404;
            message=`Product with id ${id} does not exist`;
            return res.status(statusCode).json(formatResponseJSON(data,message))
        }
        let {item,price,stocks} = req.body;
        data.item = item?item:data.item;
        data.price = price?price:data.price;
        data.stocks = stocks?stocks:data.stocks;

        for(leti=0;i<products.length;i++){
            if(products[i].productid===id){
                products[i]=data;
                break;
            }
        }
        fs.writeFileSync("./Database/products.json",JSON.stringify(products),"utf-8");
        return res.status(statusCode).json(formatResponseJSON(products))
    }
}
module.exports ={ProductController}