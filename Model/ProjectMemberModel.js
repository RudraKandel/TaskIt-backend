const mongoose = require('mongoose');

const PMember = new mongoose.Schema(
    {
        project:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Project',
            required:true
        },
        developer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        }

    },{timestamps:true}
);

module.exports = mongoose.model("ProjectMember",PMember);