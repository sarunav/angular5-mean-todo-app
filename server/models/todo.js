const mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
    name: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    note: {
        type: String
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('todos', todoSchema);