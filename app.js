const express = require("express");
const expressLayout = require("express-ejs-layouts");
const {Pool, Client} = require("pg");
const router = express.Router();

const app = express();

//ejs
app.use(expressLayout);
app.set("view engine", "ejs");

// // DB config, connectionString
// const db = require("./config/keys").PostgresURI;


// const client = new Client({
//   connectionString:db
// });

// client.connect().then(()=> {console.log("conectado")}).catch(err => console.log(err));

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


//Rutas para direccionar a los archivos .js, cuando ingresamos una ruta tenemos que
// decirle a cual archivo ir

  // para cuando se ingresa localhost:8000/

app.use('/assets', express.static('./public'));
app.use('/', require("./routes/index"));
app.use('/authUsuarios', require("./routes/authUsuarios"));

// Puerto que utilizará el servidor
const PORT = process.env.PORT || 8000;

// poner al servidor a eschuchar en ese puerto
app.listen(PORT, console.log(`Escuchando en puerto ${PORT}`));

module.export = router;