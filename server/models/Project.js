const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, 
    description: { type: String },
    managerId: { type: String, required: true }, 
});
module.exports = mongoose.model('project', ProjectSchema);