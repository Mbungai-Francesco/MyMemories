import express from 'express';
import {
  DeleteUser,
  GetUser,
  GetUsers,
  UpdateUser
} from '../controller/UserController';

const UserRoutes = express.Router();

UserRoutes.get('/users', GetUsers);
UserRoutes.get('/users/:id', GetUser);
UserRoutes.put('/users/:id', UpdateUser);
UserRoutes.delete('/users/:id', DeleteUser);

export default UserRoutes;