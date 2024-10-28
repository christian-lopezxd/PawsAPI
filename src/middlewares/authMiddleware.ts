import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: string | JwtPayload;
  }
}
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};
