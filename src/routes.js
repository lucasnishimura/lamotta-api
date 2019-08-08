import { Router } from 'express';

import clientesController from './controllers/clientesController';

import validateFileds from './middlewares/validateFields';

const routes = new Router();

routes.get('/clientes/:id?', clientesController.index);
routes.post('/clientes',validateFileds, clientesController.store);
routes.put('/clientes', clientesController.update);

export default routes;
