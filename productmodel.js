const {Product} = require('./models')

// Product.create({
//     item:"OnePlus 11",
//     price:11000000,
//     stocks:5,
//     createAt : new Date(),
//     updatedAt: new Date(),
// })
//     .then ((result)=>{
//         console.log(result.dataValues);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

// Product.create({
//     item:"Google Pixel 8 pro",
//     price:14000000,
//     stocks:4,
//     createAt : new Date(),
//     updatedAt: new Date(),
// })
//     .then ((result)=>{
//         console.log(result.dataValues);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// Product.create({
//         item:"Iphone XV",
//         price:21000000,
//         stocks:12,
//         createAt : new Date(),
//         updatedAt: new Date(),
//     })
//         .then ((result)=>{
//             console.log(result.dataValues);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// Product.create({
//     item:"Samsung S22",
//     price:12000000,
//     stocks:20,
//     createAt : new Date(),
//     updatedAt: new Date(),
// })
//     .then ((result)=>{
//         console.log(result.dataValues);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
Product.findOne({
    where:{
        id:1,
    }
})
.then((result)=>{
    let product = result.dataValues;
    console.log(product)
})

