const {Product}= require('../models')
const {formatResponseJSON} = require('../response.js')


class ProductController{
    static async getAll(req, res) {
        //Note pastikan pakai try-catch jika menggunakan async-await 
        let message='success'
        const product = await Product.findAll()
        return res.status(200).json(formatResponseJSON(product,message));
    }
    static async getById(req,res){
        let statusCode =200;
        let message='success'
        try {
            //Note: perhatikan indentasi
        let id = +req.params.id
        let product = await Product.findOne({
            where:{
              id,
            }
          })
        if(!product){
            throw new Error('User is not found')

        }
        
          let result = product.dataValues;
          return res.status(statusCode).json(formatResponseJSON(result,message))
          
          
        }catch (error){
            return res.status(404).json({message:error.message})
        }
    }
    static async addItem(req,res){
        
        let {item,price,stocks}=req.body;
        try{
            let product = await Product.findOne({where:
            {item:item}
        })
        if(!product){
        await Product.create({item:item,price:price,stocks:stocks})
        }
        if(product){
            throw new Error('Product has already exist')
        }}catch(error){
            return res.status(409).json({message:error.message})
        }
    
        return res.status(200).json({message:'New product successfully added'})
    
    }
    static async deleteItem(req,res){


        try{
            let id = +req.params.id;
            let product= await Product.destroy({
                where:{
                    id
                }
            })
            if(!product){
                throw new Error('Product is not found')
            }
            return res.status(200).json({message:'Product successfully deleted'})
        }catch (error){
            return res.status(404).json({message:error.message})
        }

       
    }
    static async updateProduct(req,res){
        let id =+req.params.id;
        let statusCode=200;
        let {item,price,stocks}=req.body
        try{
            let product = await Product.findOne(
                {where:{
                    id,
                },
            })
            await Product.update({item:item,price:price,stocks:stocks},
                {where:{
                id
            }})
        if(!product){
            throw new Error('Product is not found')
        }
        }catch(error){
            return res.status(404).json({message:error.message})
        }
        return res.status(statusCode).json({message:'Product successfully updated'})

    }
}
module.exports ={ProductController}