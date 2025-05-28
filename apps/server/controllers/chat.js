const { response, request } = require('express');

const Chat = require('../models/chat');

const chatPost = async(req, res = response) => {
    
    const { title, messages, state } = req.body;
    const chat = new Chat({ title, messages, state});

    // Guardar en BD
    await chat.save();

    res.json({
        chat
    });
}

const chatGet = async(req = request, res = response) => {

    let { id } = req.params;

    let chat = await Chat.findById(id);

    res.json({
        chat
    });
}

const chatPatch = async(req, res = response) => {

    const { id } = req.params;
    const message = req.body;

    let { messages } = await Chat.findById(id);

    const chat = await Chat.findByIdAndUpdate(id, { messages: [ ...messages, message ] });

    res.json({
        res: "Mensaje anadido",
        message,
    });
}

module.exports = {
    chatPost,
    chatGet,
    chatPatch,
}