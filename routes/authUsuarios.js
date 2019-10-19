const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
    res.render("login");
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/login', urlencodedParser, (req, res) => {
    //console.log(req.body.email);
    // poner aquí la validación del usuario una vez que se busca en la BD
    res.render('perfilUsuario');
})

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', urlencodedParser, (req, res) => {

    // almacenar en la BD la información del usuario
    res.render("perfilUsuario");
});

router.get('/main', (req, res) => {
    res.render('perfilUsuario');
})

router.get('/busquedas', (req, res) => {
    res.render('busquedas');
})

router.get('/chat', (req, res) => {
    res.render('chat');
})

router.get('/chatConversacion', (req, res) => {
    res.render('chatConversacion');
})

router.get('/verPerfilBuscado', (req, res) => {
    res.render('verPerfilBuscado');
})

module.exports = router;
