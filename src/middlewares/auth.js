import jwt from 'jsonwebtoken';
import localStorage from 'localStorage';
import { promisify, log } from 'util';
import moment from 'moment';

import authConfig from '../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.bearer;

  if (!authHeader) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  if(authHeader != localStorage.getItem('token')){
    return res.status(401).json({ error: 'Não autorizado' });
  }
   
  if(moment(localStorage.getItem('last_access'), "ddd MMM DD YYYY H:mm:ss").fromNow() == '30 minutes ago' ){
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const decoded = await promisify(jwt.verify)(authHeader, authConfig.secret);

    req.userId = decoded.id;

    return next(); 
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
