const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        role :{
            type: String,
           required:[true,'please enter a role'],
        },
    },{timestamps: true}
);

module.exports =mongoose.model('Role',roleSchema);

