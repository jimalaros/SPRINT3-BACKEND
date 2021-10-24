import Express from 'express';
import {
  Usuarios,
  crearUsuario,
  consultarOCrearUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarUsuario
} from '../../controllers/usuarios/controller.js';

const rutasUsuarios = Express.Router();

const Callback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los usuarios');
  } else {
    res.json(result);
  }
};

rutasUsuarios.route('/usuarios').get((req, res) => {
  Usuarios(Callback(res));
});

rutasUsuarios.route('/usuarios/nuevos').post((req, res) => {
  crearUsuario(req.body, Callback(res));
});

rutasUsuarios.route('/usuarios/info').get((req, res) => {
  console.log('alguien hizo get en la ruta /info');
  consultarOCrearUsuario(req, Callback(res));
});

rutasUsuarios.route('/usuarios/:id').get((req, res) => {
  consultarUsuario(req.params.id, Callback(res));
});

rutasUsuarios.route('/usuarios/Eliminar/:id').patch((req, res) => {
  editarUsuario(req.params.id, req.body, Callback(res));
});

rutasUsuarios.route('/usuarios/:id').delete((req, res) => {
  eliminarUsuario(req.params.id, Callback(res));
});

export default rutasUsuarios;
