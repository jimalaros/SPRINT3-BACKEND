import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';

import rutasOrdenes from './Routes/ordenes/rutas.js';
import rutasUsuarios from './Routes/usuarios/rutas.js';

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.use(rutasOrdenes);
app.use(rutasUsuarios);

const main = () => {
  return app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

conectarBD(main);
