import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import rutasOrdenes from './Routes/ordenes/rutas.js';
import rutasUsuarios from './Routes/usuarios/rutas.js';
import autorizacionEstadoUsuario from './middleware/autorizacionEstadoUsuario.js';

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://devstwo.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'fast-food-delivery',
  issuer: 'https://devstwo.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(autorizacionEstadoUsuario);

app.use(rutasOrdenes);
app.use(rutasUsuarios);

const main = () => {
  return app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

conectarBD(main);
