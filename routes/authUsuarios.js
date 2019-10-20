const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {Pool, Client} = require('pg');
const db = require('../config/keys').PostgresURI;
const UsuarioModel = require('../models/usuario');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

var clienteGlobal = null;


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
    console.log('login:post Entro a login para buscar usuarios');

    var email = req.body.email;
    var password = req.body.password;

    var errors = [];

    var encontrado = false;
    if(!email || !password){
        errors.push({msg: "Por favor llevar todos los campos"});
        res.render('login',{
            email, password
        })
    } else {
        const client = new Client({
            connectionString:db
        });
    
        client.connect().then(()=> {
            console.log("conectado");
    
            const consulta1 = 'Select * from public.clientes where id=\'' + email + '\' and password=\'' + password + "\'"; 
            //const values1 = [email, password]
            // callback
            client.query(consulta1, (err, res2) => {
                if (err) {
                    console.log(err);
                } else {
                    if(typeof res2.rows[0] != 'undefined'){
                        encontrado = true;
                        var respuesta = res2.rows[0];
                        //console.log(res2.rows[0])
                        if(encontrado){
                            var cliente = new UsuarioModel(
                                respuesta.id,
                                respuesta.nombre,
                                respuesta.tipo_usuario,
                                respuesta.capacidad,
                                respuesta.pagina_web,
                                respuesta.mision,
                                respuesta.vision,
                                respuesta.direccion,
                                respuesta.rol,
                                respuesta.telefono,
                                respuesta.provincia,
                                respuesta.password
                            )
                            //console.log(cliente)
                            clienteGlobal = cliente;
                            res.render('perfilUsuario',{
                                cliente
                            })
                        } else {
                            res.render('login',{
                                email, password
                            })
                        }
                    }                  
                    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
                }
                //console.log('Fin del else');
            });
            //dospinosconsultas@dospinos.com
            

        }).catch(err => console.log(err));

        
    }

    //------------------------------------------
    
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

    if(!nombre || !tipoUsuario || !rol || !provincia || !telefono || !direccion || !email || !password){
        res.render('register',{
            nombre, tipoUsuario, rol, provincia, telefono, direccion, email, password
        })
    } else{
        client.connect().then(()=> {
            console.log("conectado");
    
            var ingresado = false;
    
            const consulta = 'INSERT INTO public.clientes(id, nombre, tipo_usuario, direccion, rol, telefono, provincia, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'
            const values = [email, nombre, tipoUsuario, direccion, rol, telefono, provincia, password]
            // callback
            client.query(consulta, values, (err, res2) => {
                if (err) {
                    console.log(err.stack)
                    
                } else {
                    console.log(res2.rows[0])
                    ingresado = true;
                    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
                }

                if(ingresado){
                    var cliente = new UsuarioModel(
                        email,
                        nombre,
                        tipoUsuario,
                        null,
                        null,
                        null,
                        null,
                        direccion,
                        rol,
                        telefono,
                        provincia,
                        password
                    )
                    console.log(cliente)
                    clienteGlobal = cliente;
                    res.render('perfilUsuario', {
                        cliente
                    })
                } else {
                    res.render('register', {
                        email, nombre, tipoUsuario, direccion, rol, telefono, provincia, password
                    })
                }

                client.end();
            })
            
        }).catch(err => console.log(err));
    }
});

router.get('/main', (req, res) => {
    console.log('main:get impresion de cliente global')
    console.log(clienteGlobal);
    
    var cliente = clienteGlobal;
    res.render('perfilUsuario', {cliente});
})

// falta de implemetar
router.post('/main', urlencodedParser, (req, res) => {

    console.log('main:post impresion de cliente global')
    console.log(clienteGlobal);

    console.log('main:post impresion de req body')
    console.log(clienteGlobal);

    var nombre = req.body.nombre;
    var email = req.body.email;
    var rol = req.body.rol;
    var telefono = req.body.telefono;
    var paginaWeb = req.body.paginaWeb;
    var direccion = req.body.direccion;
    var mision = req.body.mision;
    var vision = req.body.vision;

    const client = new Client({
        connectionString:db
    })

    var encontrado = false;

    if(!nombre || !rol || !telefono || !direccion){
        var cliente = clienteGlobal;
        console.log('main:post hay campos vacios')
        res.render('perfilUsuario', {cliente} )
    } else {
        client.connect().then(() => {
            console.log('main:post cliente conectado')
            var consultaUpdate = 'update public.clientes set nombre=\'' + nombre + '\', rol=\'' + rol + '\', telefono=\'' + telefono + '\', pagina_web=\'' + paginaWeb + '\', direccion=\'' + direccion + '\', mision=\'' + mision + '\', vision=\'' + vision +'\''
            
            client.query(consultaUpdate, (err, res2) => {
                if(err){
                    console.log('post:main no se puedo actualizar el cliente');
                    console.log(err);
                    var cliente = clienteGlobal;
                    res.render('perfilUsuario',{cliente})
                } else {
                    console.log('main:post modificando cliente Global, consulta satisfactoria')
                    //alert('Información actualizada');
                    clienteGlobal.setNombre(nombre);
                    clienteGlobal.setRol(rol);
                    clienteGlobal.setTelefono(telefono);
                    clienteGlobal.setPaginaWeb(paginaWeb);
                    clienteGlobal.setDireccion(direccion);
                    clienteGlobal.setMision(mision);
                    clienteGlobal.setVision(vision);

                    console.log('main:post impresion de cliente global despues de metodos set')
                    console.log(clienteGlobal);         

                    cliente = clienteGlobal;
                    res.render('perfilUsuario', {cliente});
                }
    
            })
    
        }).catch(err => console.log(err.stack));
    }
})

router.get('/busquedas', (req, res) => {
    console.log('busquedas:get impresion de cliente global')
    console.log(clienteGlobal);
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
