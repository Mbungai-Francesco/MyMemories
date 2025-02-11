import express from 'express';
import { CreateUser, GetUserByMail, loginUser } from '../controller/UserController';

const SignUp = express.Router()
const LoginRoute = express.Router()

SignUp.post('/users', CreateUser);

LoginRoute.post('/login', loginUser);
LoginRoute.get('/mail/:mail', GetUserByMail);
 
export { LoginRoute, SignUp};