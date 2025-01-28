import express, { Request, Response } from 'express';
require('dotenv').config();

import cors from 'cors';
import { LoginRoute, SignUp } from '../routes/LoginRoute';
import UserRoutes from '../routes/UserRoutes';
import { authenticateToken } from '../middleware/auth';
import NoteRoutes from '../routes/NoteRoutes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Notes API services...' });
});

app.use(
  '/api',
  SignUp,
  LoginRoute,
  authenticateToken,
  UserRoutes,
  NoteRoutes
)

app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'You are OUT OF BOUNDARIES!!!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `server running on port ${PORT} : \nlocalhost: http://localhost:${PORT}`,
  );
});