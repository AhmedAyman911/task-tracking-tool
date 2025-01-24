const mongoose = require("mongoose");
const SprintSchema = new mongoose.Schema({
    sprint: {type: Number},
    task_name: { type: String, required: true },
    role: { type: String, required: true },
    from: { type: String, required: true},
    to:{type: String, required: true},
    projectId:{type: String, required: true},
    description: { type: String, required: true },
    priority: { type: String, default: "Medium" },
    assignee:{ type: String }
})
const SprintModel = mongoose.model("sprints",SprintSchema)
module.exports = SprintModel