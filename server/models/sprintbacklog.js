const mongoose = require('mongoose');

const SprintBacklogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "To Do" }, // 'To Do', 'In Progress', 'Done'
    priority: { type: String, default: "Medium" }, // 'High', 'Medium', 'Low'
    assignee: { type: String },
    sprint: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' }, // Link to Sprint
    createdAt: { type: Date, default: Date.now }
});

const SprintBacklog = mongoose.model('SprintBacklog', SprintBacklogSchema);
module.exports = SprintBacklog;
