//codigo encargado de gestionar los datos con la base de datos de los medicos
require('rootpath')();

const mysql = require("mysql");
const configuracion = require("config.json");
const { query } = require('express');
// Agregue las credenciales para acceder a su base de datos
const connection = mysql.createConnection(configuracion.database);

connection.connect((err) => {
    if (err) {
        console.log(err.code);
    } else {
        console.log("BD conectada");
    }
});

var metodos = {}

// --> app.get("/", listarTodo());  --> ingreso = ingresoBD.getAll((err, result) => {}
metodos.getAll = function (callback) {
    consulta = "select * from ingreso";
    connection.query(consulta, function (err, resultados, fields) {
        if (err) {
            callback(err);
            return;
        } else {
            callback(undefined, {
                messaje: "Resultados de la consulta",
                detail: resultados,
            });
        }
    });
}


//--> ingresoBD.metodos.creaIngreso(req.body, (err, exito) => {});
metodos.crearIngreso = function (datosIngreso, callback) {
    ingreso = [
        datosIngreso.fecha_ingreso,
        datosIngreso.nro_habitacion,
        datosIngreso.nro_cama,
        datosIngreso.observaciones,
        datosIngreso.nro_hisotorial_paciente,
        datosIngreso.matricula_medico
    ];
    consulta =
        "INSERT INTO INGRESO (fecha_ingreso, nro_habitacion, nro_cama, observaciones, nro_hisotorial_paciente, matricula_medico) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(consulta, ingreso, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    message: "ya existe un ingreso con ese código " + datosIngreso.id_ingreso,
                    detail: err.sqlMessage
                })
            } else {
                callback({
                    message: "otro error que no conocemos",
                    detail: err.sqlMessage
                })
            }


        } else {
            callback(undefined, {
                message: "el ingreso" + datosIngreso.id_ingreso + "se registro correctamente",
                detail: rows,
            })
        }
    });
}

module.exports = { metodos }
