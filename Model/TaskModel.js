const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const taskSchema = new mongoose.Schema(
    {

        task_title : {
            type: String,
            required: [true,'Enter task title'],
        },
        task_description : {
            type: String,
            required: [true,'Enter task description title'],
        },
        task_status : {
            type: String,
            enum:[
                'Assigned',
            'Ongoing',
            'Completed',
        ],
        default:'Assigned'
        },
      // task_priority : Number,
        task_deadline : {
            type: Date,
            required:[true,'Enter task deadline']
        },
        user_id :  {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        project_id : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Project'
        }
    },{timestamps: true}
);

module.exports = mongoose.model("Task",taskSchema);
