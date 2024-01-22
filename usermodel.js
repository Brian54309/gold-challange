const {Product,Order,User} = require('./models')

// User.create({
//     email:"qwesy@gmail.com",
//     username:"qwerty5432",
//     password:"pafssword",
//     createAt: new Date(),
//     updatedAt:new Date(),
// })
//     .then((result)=>{
//         console.log(result.dataValues);
//     })
//     .catch((err)=>{
//         console.error(err);
//     })
    User.create({
        email:"lorem@ipsum.com",
        username:"loremipsum",
        password:"123456",
        createAt: new Date(),
        updatedAt:new Date(),
    })
        .then((result)=>{
            console.log(result.dataValues);
        })
        .catch((err)=>{
            console.error(err);
        })