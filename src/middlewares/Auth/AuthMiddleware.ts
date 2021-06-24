import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth.json'

const middlewareAuth = (request: Request, response: Response, next) => {
  const authHeader = request.headers.authorization;
  
  if (!authHeader) return response.status(401).json({ error: 'No token provided' })
  
  const tokenParts = authHeader.split(' ');
  const isCorrectToken = tokenParts.length === 2;
  
  if (!isCorrectToken) return response.status(401).json({ error: 'Token error' })
  
  const [ scheme, token ] = tokenParts;

  if (!/^Bearer$/i.test(scheme)) return response.status(401).json({ error: 'Token malformatted' })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return response.status(401).json({ error: 'Token invalid' })

    // Achar uma forma de inserir o id na requisição
    // pois o ts não permite alterar o formato da requisição
    // request.userId = decoded.id;

    return next();
  })
}

export { middlewareAuth };