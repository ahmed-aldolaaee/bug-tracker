const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["functional", "performance", "usability", "compatibility", "security"]
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"]
    },
    status: {
        type: String,
        required: true,
        default: "open",
        enum: ["open", "inProgress", "resolved"]
    },
    postedBy: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        default: "none"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;