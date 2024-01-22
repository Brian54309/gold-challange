const {User,userlogin}= require('../models')
const {formatResponseJSON} = require('../response.js')




class UserController{
    
    static async getAll(req,res){
        let message='success'
        const user = await User.findAll()
        return res.status(200).json(formatResponseJSON(user, message));
    }

    static async getById(req,res){
        let statusCode =200;
        let message='success'
        try{
        let id = +req.params.userid
        let user = await User.findOne({
            where:{
              id,
            }
          })
        if(!user){
            throw new Error('User is not found')

        }
        
          let result = user.dataValues;
          return res.status(statusCode).json(formatResponseJSON(result,message))
          
          
        }catch (error){
            return res.status(404).json({message:error.message})
        }
        

    } 

    static async deleteUser(req,res){


        try{
            let id = +req.params.userid;
            let user= await User.destroy({
                where:{
                    id
                }
            })
            if(!user){
                throw new Error('User is not found')
            }
            return res.status(200).json({message:'user successfully deleted'})
        }catch (error){
            return res.status(404).json({message:error.message})
        }

       
    }

    static async updateUser(req,res){
        let id =+req.params.userid;
        let statusCode=200;
        let {email,username,password}=req.body
        try{
            let user = await User.findOne(
                {where:{
                    id,
                },
            })
            await User.update({email:email,username:username,password:password},
                {where:{
                id
            }})
        if(!user){
            throw new Error('User is not found')
        }
        }catch(error){
            return res.status(404).json({message:error.message})
        }
        return res.status(statusCode).json({message:'User credential successfully changed'})

    }

    static async register(req,res){
        
        let {email,username,password}=req.body;
        try{
            let user = await User.findOne({where:
            {email:email}
        })
        if(!user){
        await User.create({email:email,username:username,password:password})
        }
        if(user){
            throw new Error('User has already exist')
        }}catch(error){
            return res.status(409).json({message:error.message})
        }
    
        return res.status(200).json({message:'New user successfully registered'})
    
    }


}
class loginHandler{

    static async logIn(req,res){

        let{email,password}=req.body
        let user = await userlogin.findAll()
        let user2=await User.findOne({where:{
            email:email,
            password:password
        }})
        try{
            if(user.length!==0){
                console.log(user.length)
                throw new Error('User is already logged in')

            }else if(!user2){
                throw new Error('User email and password does not match')
            }else{
                await userlogin.create({userid:user2.id})
                return res.status(200).json({message:'User successfully login'})
            }
        }catch(error){
            return res.status(403).json({message:error.message})
        }

        
    }
    static async logOut(req,res){
        await userlogin.destroy({
            truncate:true
        })
        return res.status(200).json({message:'Logout successful'})
    }
}

module.exports={UserController,loginHandler}