const mongoose =require ('mongoose')

 const db = mongoose.connect(process.env.DB).then(()=>{
    console.log(`connection sucessful`);
}).catch((err)=>{
    console.log(`connection failed`);
});



module.exports=db;