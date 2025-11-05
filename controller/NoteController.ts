import { time } from 'console';
import { db } from '../lib/db';
import { Request, Response } from 'express';

export const CreateNote = async (req: Request, res: Response) => {
  try{
    const { title, date, userId } = req.body
    if(!title || !date || !userId){
      return res.status(400).json({ message: 'All fields are required' });
    }

    const findNote = await db.note.findUnique({
      where: {
        title_userId:{
          title: title,
          userId: userId
        },
      },
    })

    if(findNote){
      return res.status(400).json({ message: 'Note already exists' });
    }

    const newNote = await db.note.create({
      data : {
        ...req.body,
        time : new Date(date).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        deleted: false
      }
    })

    if(!newNote){
      return res.status(400).json({ message: 'Note not created' });
    }

    return res.status(201).json({ message: 'Note created', data: newNote });
  } catch (error: any){
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetNotes = async (req: Request, res: Response) => {
  try {
    const notes = await db.note.findMany({
      include:{
        tags: true,
        category: true
      }
    });
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'No notes found' });
    }
    return res.status(200).json({ message: 'Notes found', data: notes });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetUserNotes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    if( !userId){
      return res.status(400).json({ message: 'userId are required' });
    }
    const notes = await db.note.findMany({
      where: {
        userId: userId
      },
      include:{
        tags: true,
        category: true
      }
    });
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'No notes found' });
    }
    return res.status(200).json({ message: 'Notes found', data: notes });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await db.note.findUnique({
      where: {
        id: id,
      },
      include:{
        tags: true,
        category: true
      }
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json({ message: 'Note found', data: note });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const UpdateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, date, time, content, tags, category } = req.body;
    if (!title || !date || !time || !content) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const findNote = await db.note.findUnique({
      where: {
        id: id,
      },
    });
    if (!findNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    const updatedNote = await db.note.update({
      where: {
        id: id,
      },
      data: {
        ...req.body
      },
    });
    if (!updatedNote) {
      return res.status(400).json({ message: 'Note not updated' });
    }
    return res.status(200).json({ message: 'Note updated', data: updatedNote });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const note = await db.note.findUnique({
      where : { 
        id: id
      }
    })

    if(!note){
      return res.status(404).json({ message: 'Note not found  '});
    }

    const deleteNote = await db.note.delete({
      where: {
        id: id,
      },
    });

    if(!deleteNote){
      return res.status(400).json({ message: 'Note not deleted' });
    }
    return res.status(200).json({ message: 'Note deleted', data: deleteNote });
  }catch (error: any){
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}