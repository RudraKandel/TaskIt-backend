const mongoose = require('mongoose');

const PMember = new mongoose.Schema(
    {
        project_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Project'
        },
        developer_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }

    },{timestamps:true}
);

module.exports = mongoose.Model("ProjectMember",PMember);