const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    type: { type: String, required: true },
    key: { type: String, required: true}, 
    summary: { type: String, required: true }, 
    status: { type: String, required: true }, 
    assignee: { type: String},
    uid:{type: String, required: true},
    dueDate: { type: Date, required: true }, 
    testing: { type: String},
    projectId:{type: String, required: true},
    completedDate: { type: Date}, 
}); 
module.exports = mongoose.model('task', TaskSchema);