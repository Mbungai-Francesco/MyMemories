import express from 'express';
import { CreateCategory, deleteCat, GetCat, GetCats, UpdateCat } from '../controller/CategoryController';

const CatRoutes = express.Router();

CatRoutes.get('/cats', GetCats);
CatRoutes.get('/cats/:id', GetCat);
CatRoutes.post('/cats', CreateCategory);
CatRoutes.put('/cats/:id', UpdateCat);
CatRoutes.delete('/cats/:id', deleteCat);

export default CatRoutes;