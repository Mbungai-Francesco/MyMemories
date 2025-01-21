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

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      include: {
        tags: true,
        categories: true,
        notes: true
      }
    });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json({ message: 'Users found', data: users });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const GetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        tags: true,
        categories: true,
        notes: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User found', data: user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateUser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        ...req.body,
      },
    });

    if (!updateUser) {
      return res.status(400).json({ message: 'User not updated' });
    }
    return res.status(200).json({ message: 'User updated', data: updateUser });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await db.user.delete({
      where: {
        id: id,
      },
    });

    if (!deleteUser) {
      return res.status(400).json({ message: 'User not deleted' });
    }
    return res.status(200).json({ message: 'User deleted', data: deleteUser });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password required' });
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken(user.id);

    return res.status(200).json({ message: 'User logged in', token, data: user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}