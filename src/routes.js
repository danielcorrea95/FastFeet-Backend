import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionsController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import RecipientsController from './app/controllers/RecipientsController';
import DeliverersController from './app/controllers/DeliverersController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);
routes.post('/recipients', RecipientsController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/deliverers', DeliverersController.store);
routes.put('/deliverers/:id', DeliverersController.update);
routes.get('/deliverers', DeliverersController.index);
routes.delete('/deliverers/:id', DeliverersController.delete);

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);

export default routes;
