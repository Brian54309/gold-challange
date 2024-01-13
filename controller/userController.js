let users = require("../Database/users.json")
const {formatResponseJSON} = require('../response.js')
const fs = require("fs");
let temp_data=''

class UserController{
    
    static getAll(req,res){
        let message='success'
        return res.status(200).json(formatResponseJSON(users, message));
    }

    static getById(req,res){
        let statusCode =200;
        let message='success'
        let user = users.find((i)=>i.userid ===+req.params.userid);

        if (user === undefined){
            statusCode=404;
            message=`Users with id ${req.params.userid} does not exist`

        }
        return res.status(statusCode).json(formatResponseJSON(user,message))
    }
    static deleteUser(req,res){
        let userid = +req.params.userid;
        let statusCode=200
        const data = users.find((i)=> i.userid === +userid);

        if(data === undefined){
            statusCode=404;
            message = `User with id ${userid} does not exist`;
            return res.status(statusCode).json(formatResponseJSON(data,message))

        }
        let newData=users.filter((data) =>data.userid !==userid);

        fs.writeFileSync("./Database/users.json",JSON.stringify(newData),"utf-8")
        return res.status(statusCode).json(formatResponseJSON())
    }
    static register(req,res){
        
        let {email,username}=req.body;
        let userid =users[users.length - 1].userid+1;

        let data={
            userid:userid,
            email:email,
            username:username,
        }
        users.push(data)
        fs.writeFileSync("./Database/users.json",JSON.stringify(users),"utf-8")
        res.redirect('/')
    }
    static logIn(req,res){

            let data={
                email:req.body.email,
                username:req.body.username
            }
        
            let isFound=true
            for(let i=0;i<users.length;i++){
                let check_data=users[i]
                if((data.email===check_data.email)&&(data.username===check_data.username)){
                    temp_data=check_data.userid
                    break;
                }else{
        
                    isFound=false
                }
            }
                if(isFound===true){   
                    console.log('1')
                    res.redirect('/')
                    
                }else{
                    console.log('2')
                    res.redirect('/users/login')
        
                }
            
        }
        static logOut(req,res){
             temp_data=null;
            res.redirect('/users/login')
        }

    }



module.exports={UserController}