const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        role :{
            type: String,
            enum : ['Employee','PM']
        }
    },{timestamps: true}
);

module.exports =mongoose.model('Role',roleSchema);

