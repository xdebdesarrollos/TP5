//--- requires ------------------------------------------
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const ingresoBD = require("./../modelos/ingresoModel.js");

// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para MEDICO --- 
// --------------------------------------------------------

app.get("/", listarTodo);
app.post('/create', crear);
//app.get('/:matricula', obtenerIngreso);
app.delete("/:id_ingreso", eliminarIngreso);
app.put("/:id_ingreso", modificarIngreso);

// --------------------------------------------------------
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS -------------
// --------------------------------------------------------

function listarTodo(req, res) {
    ingreso = ingresoBD.metodos.getAll((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    }
    );
}

function crear(req, res) {
    ingresoBD.metodos.crearIngreso(req.body, (err, exito) => {
        if (err) {
            res.send(err);
        } else {
            res.json(exito);
        }
    });
}


//app.put("/:ingreso", modificarIngreso);



function modificarIngreso(req, res) {
    datosIngreso = req.body;
    deEsteIngreso = req.params.id_ingreso;
    ingresoBD.metodos.update(datosIngreso, deEsteIngreso, (err, exito) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(exito) //ingreso modificado
        }
    });
}


function eliminarIngreso(req, res) {
    ingresoBD.metodos.deleteIngreso(req.params.id_ingreso, (err, exito) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.send(exito)
        }
    })
}

//exportamos app que es nuestro servidor express a la cual se le agregaron endpoinds de escucha
module.exports = app;