import Express from 'express';
import {
  Ordenes,
  crearOrden,
  editarOrden,
  eliminarOrden
} from '../../controllers/Ordenes/controller.js';

const rutasOrdenes = Express.Router();

const Callback = (res) => (err, result) => {
  if (err) {
    console.log('error', err);
    res.status(500).json({ error: err });
  } else {
    res.json(result);
  }
};

rutasOrdenes.route('/ordenes').get((req, res) => {
  Ordenes(Callback(res));
});

rutasOrdenes.route('/ordenes/nuevas').post((req, res) => {
  crearOrden(req.body, Callback(res));
});

rutasOrdenes.route('/ordenes/Editar/:id').patch((req, res) => {
  editarOrden(req.params.id, req.body, Callback(res));
});

rutasOrdenes.route('/ordenes/Eliminar/:id').delete((req, res) => {
  eliminarOrden(req.params.id, Callback(res));
});

export default rutasOrdenes;
