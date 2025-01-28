import express from 'express';
import { CreateTag, deleteTag, GetTag, GetTags, UpdateTag } from '../controller/TagController';

const TagRoutes = express.Router();

TagRoutes.get('/tags', GetTags);
TagRoutes.get('/tags/:id', GetTag);
TagRoutes.post('/tags', CreateTag);
TagRoutes.put('/tags/:id', UpdateTag);
TagRoutes.delete('/tags/:id', deleteTag);

export default TagRoutes;