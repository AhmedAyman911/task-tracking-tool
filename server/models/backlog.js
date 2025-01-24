const mongoose = require('mongoose');

const BacklogItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, default: "Medium" },
    dueDate: { type: Date },
    projectId: { type: String, required: true }
});

const BacklogItem = mongoose.model('Backlog', BacklogItemSchema);
module.exports = BacklogItem;
