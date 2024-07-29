import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mysecretcode';

const isLoggedIn = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string, id: string }; 

    req.email = decoded.email; 
    req.id = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export { isLoggedIn };
