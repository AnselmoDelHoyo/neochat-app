const { Schema, model } = require('mongoose');

const ChatSchema = Schema({
    title: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    messages: {
        type: Array,
        default: []
    },
    state: {
        type: Boolean,
        default: true
    },
});

module.exports = model( 'Chat', ChatSchema);
