import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const Usuarios = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ _id: new ObjectId(id) }, callback);
};

const editarUsuario = async (id, edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuarios')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, callback);
};

export {
  Usuarios,
  crearUsuario,
  consultarUsuario,
  editarUsuario,
  eliminarUsuario
};
