import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const Ordenes = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ordenes').find({}).limit(50).toArray(callback);
};

const crearOrden = async (datosOrden, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ordenes').insertOne(datosOrden, callback);
};

const consultarOrden = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ordenes').findOne({ _id: new ObjectId(id) }, callback);
};

const editarOrden = async (id, edicion, callback) => {
  const filtroOrden = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('ordenes')
    .findOneAndUpdate(filtroOrden, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarOrden = async (id, callback) => {
  const filtroOrden = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ordenes').deleteOne(filtroOrden, callback);
};

export { Ordenes, crearOrden, consultarOrden, editarOrden, eliminarOrden };
