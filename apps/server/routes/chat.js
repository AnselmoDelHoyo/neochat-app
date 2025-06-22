
const { Router } = require('express');
const { check } = require('express-validator');

const { chatPost, chatGet, chatGetAll, chatPatch } = require('../controllers/chat');
const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    validarCampos
], chatPost);

router.get('/:id', chatGet);

router.get("/", chatGetAll);

router.patch('/:id', chatPatch);

module.exports = router;