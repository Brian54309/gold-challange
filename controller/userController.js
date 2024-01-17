const { log } = require("console");
let users = require("../Database/users.json")
const {formatResponseJSON} = require('../response.js')
const fs = require("fs");


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

    static updateUser(req,res){
        let userid =+req.params.userid;
        let statusCode=200;

        const data = users.find((i)=>i.userid === +userid)
        if(data === undefined){
            statusCode=404;
            message=`User with id ${userid} does not exist`;
            return res.status(statusCode).json(formatResponseJSON(data,message))
        }
        let {email,username,password}=req.body;
        data.email = email?email:data.email;
        data.username = username?username:data.username;
        data.password = password?password:data.password;

        for(let i=0;i<users.length;i++){
            if(users[i].userid===userid){
                users[i]=data;
                break;
            }
        }
        fs.writeFileSync("./Database/users.json",JSON.stringify(users),"utf-8");
        return res.status(statusCode).json(formatResponseJSON(users))

    }

    static register(req,res){
        
        let {email,username,password}=req.body;
        let userid =users[users.length - 1].userid+1;

        let data={
            userid:userid,
            email:email,
            username:username,
            password:password
        }
        users.push(data)
        fs.writeFileSync("./Database/users.json",JSON.stringify(users),"utf-8")
        res.redirect('/')
    }

    



    }


class loginHandler{
    temp_data=''
     static logIn(req,res){

        let data={
            email:req.body.email,
            password:req.body.password
        }
    
        let isFound=true
        
        for(let i=0;i<users.length;i++){
            let check_data=users[i]
            if((data.email===check_data.email)&&(data.password===check_data.password)){
                loginHandler.temp_data=check_data.userid
                break;
            }else{
                isFound=false
            }
        }
            if(isFound===true){   
                res.redirect('/')
                
            }else{
                res.redirect('/users/login')
    
            }
        
    }
    static logOut(req,res){
        loginHandler.temp_data='';
        console.log(loginHandler.temp_data)
    res.redirect('/users/login')
    }
}

module.exports={UserController,loginHandler}