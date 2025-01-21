import { db } from '../lib/db';
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { email } = await req.body;

    if (!email) {
      return res.status(400).json({
        message:
          'email is required. please try again with these value added',
      });
    }

    // find user in db
    const finduser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (finduser) {
      return res
        .status(400)
        .json({ message: 'user already exists', data: finduser });
    }

    const createUser = await db.user.create({
      data: {
        ...req.body,
      },
    });

    if (!createUser) {
      return res.status(400).json({ message: 'user not created' });
    }
    const token = generateToken(createUser.id);
    return res.status(201).json({ message: 'User created',token, data: createUser });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}