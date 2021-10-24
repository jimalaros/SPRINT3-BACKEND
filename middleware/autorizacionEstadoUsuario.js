import { getDB } from '../db/db.js';
import jwt_decode from 'jwt-decode';

const autorizacionEstadoUsuario = async (req, res, next) => {
  // paso 1: obtener el usuario desde el token
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  console.log(user);

  // paso 2: consultar el usuario en la BD
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ correo: user.correo }, async (err, response) => {
    if (response) {
      console.log(response);
      next();
    } else {
      res.sendStatus(401);
    }
  });
};

export default autorizacionEstadoUsuario;