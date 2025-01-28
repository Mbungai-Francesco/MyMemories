import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateTag = async (req: Request, res: Response) => {
  try{
    const { name, userId } = req.body
    if(!name){
      return res.status(400).json({ message: 'Name are required' });
    }

    const findTag = await db.tag.findUnique({
      where: {
        name_userId:{
          name: name,
          userId: userId
        },
      },
    })

    if(findTag){
      return res.status(400).json({ message: 'Tag already exists' });
    }

    const newTag = await db.tag.create({
      data : {
        ...req.body
      }
    })

    if(!newTag){
      return res.status(400).json({ message: 'Tag not created' });
    }

    return res.status(201).json({ message: 'Tag created', data: newTag });
  } catch (error: any){
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetTags = async (req: Request, res: Response) => {
  try {
    const tags = await db.tag.findMany({
      include:{
        notes: true
      }
    });
    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: 'No tags found' });
    }
    return res.status(200).json({ message: 'Tags found', data: tags });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await db.tag.findUnique({
      where: {
        id: id,
      },
      include:{
        notes: true
      }
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    return res.status(200).json({ message: 'Tag found', data: tag });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const UpdateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await db.tag.findUnique({
      where: {
        id: id,
      },
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    const updatedTag = await db.tag.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json({ message: 'Tag updated', data: updatedTag });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await db.tag.findUnique({
      where: {
        id: id,
      },
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await db.tag.delete({
      where: {
        id: id,
      },
    });

    if(!tag){
      return res.status(400).json({ message: 'Tag not deleted' });
    }
    return res.status(200).json({ message: 'Tag deleted' });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
