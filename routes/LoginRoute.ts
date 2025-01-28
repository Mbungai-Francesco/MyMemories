import express from 'express';
import { CreateUser, loginUser } from '../controller/UserController';

const SignUp = express.Router()
const LoginRoute = express.Router()

SignUp.post('/users', CreateUser);

LoginRoute.post('/login', loginUser);
 
export { LoginRoute, SignUp};