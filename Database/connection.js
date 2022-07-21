const mongoose =require ('mongoose')

mongoose.connect(process.env.DB).then(()=>{
    console.log(`connection sucessful`);
}).catch((err)=>{
    console.log(`connection failed`);
});

module.exports