const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {Pool, Client} = require('pg');
const db = require('../config/keys').PostgresURI;

const urlencodedParser = bodyParser.urlencoded({ extended: false });




router.get('/', (req, res) => {
    res.render("login");
});

router.get('/login', (req, res) => {
    res.render("login");
});
//-------------------------------------------------------------------------------------------------
router.post('/login', urlencodedParser, (req, res) => {
    //console.log(req.body.email);
    // poner aquí la validación del usuario una vez que se busca en la BD
    console.log('Entro a login para buscar usuarios');

    var email = req.body.email;
    var password = req.body.password;

    var errors = [];

    if(!email || !password){
        errors.push({msg: "Por favor llevar todos los campos"});
        res.render('login',{
            email, password
        })
    }

    //------------------------------------------
    const client = new Client({
        connectionString:db
    });

    client.connect().then(()=> {
        console.log("conectado");

        const consulta1 = 'Select id from public.usuarios where id=\'' + email + '\' and password=\'' + password + "\'"; 
        //const values1 = [email, password]
        // callback
        client.query(consulta1, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res.rows[0])
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }
        });

        }).catch(err => console.log(err));
    //-----------------------------------------------------------------
    //res.render('perfilUsuario');
})

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', urlencodedParser, (req, res) => {

    // almacenar en la BD la información del usuario
    const client = new Client({
        connectionString:db
    });

    var nombre = req.body.nombre;
    var tipoUsuario = req.body.tipoUsuario;
    var rol = req.body.rol;
    var provincia = req.body.provincia;
    var telefono = req.body.telefono;
    var direccion = req.body.direccion;
    var email = req.body.email;
    var password = req.body.password;
    
    

    client.connect().then(()=> {
        console.log("conectado");

        const consulta1 = 'INSERT INTO public.usuarios(id, password) VALUES($1, $2)'
        const values1 = [email, password]
        // callback
        client.query(consulta1, values1, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res.rows[0])
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }
        });

        const consulta2 = 'INSERT INTO public.clientes(id, nombre, tipo_usuario, direccion, rol, telefono, provincia) VALUES($1, $2, $3, $4, $5, $6, $7)'
        const values2 = [email, nombre, tipoUsuario, direccion, rol, telefono, provincia]
        // callback
        client.query(consulta2, values2, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }
        client.end();
    }) }).catch(err => console.log(err));

    //console.log(req.body);
    res.render('register');
    //res.render("perfilUsuario");
});

router.get('/main', (req, res) => {
    res.render('perfilUsuario');
})

router.post('/main', (req, res) => {
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
