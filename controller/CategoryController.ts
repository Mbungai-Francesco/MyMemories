import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateCategory = async (req: Request, res: Response) => {
  try{
    const { name, userId } = req.body
    if(!name || !userId){
      return res.status(400).json({ message: 'Name and userId are required' });
    }

    const findCat = await db.category.findUnique({
      where: {
        name_userId:{
          name: name,
          userId: userId
        },
      },
    })

    if(findCat){
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCat = await db.category.create({
      data : {
        ...req.body
      }
    })

    if(!newCat){
      return res.status(400).json({ message: 'Category not created' });
    }

    return res.status(201).json({ message: 'Category created', data: newCat });
  } catch (error: any){
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetCats = async (req: Request, res: Response) => {
  try {
    const categories = await db.category.findMany({
      include:{
        notes: true
      }
    });
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }
    return res.status(200).json({ message: 'Categories found', data: categories });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetCat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await db.category.findUnique({
      where: {
        id: id,
      },
      include:{
        notes: true
      }
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(200).json({ message: 'Category found', data: category });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const UpdateCat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await db.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) {
      return res.status(404).json({ message: 'category not found' });
    }

    const updatedCat = await db.category.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json({ message: 'category updated', data: updatedCat });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteCat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await db.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) {
      return res.status(404).json({ message: 'category not found' });
    }

    const deletetCAt = await db.category.delete({
      where: {
        id: id,
      },
    });

    if(!deletetCAt){
      return res.status(400).json({ message: 'Category not deleted' });
    }
    return res.status(200).json({ message: 'Category deleted', data: deletetCAt });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
