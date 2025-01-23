const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    type: { type: String, required: true },
    key: { type: String, required: true, unique: true }, 
    summary: { type: String, required: true }, 
    status: { type: String, required: true }, 
    assignee: { type: String, required: true },
    uid:{type: String, required: true},
    dueDate: { type: Date, required: true }, 
    testing: { type: String,required: true },
    projectId:{type: String, required: true},
}); 
module.exports = mongoose.model('task', TaskSchema);