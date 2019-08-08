import validator from 'validator';  
import { promisify } from 'util';

export default async (req, res, next) => {
  const body = req.body;
  let emptyField = 0;
    
  if(validator.isEmpty(body.nome)){
    emptyField++;
  }
  if(validator.isEmpty(body.email)){
    emptyField++;
  }
  if(validator.isEmpty(body.telefone)){
    emptyField++;
  }
  if(validator.isEmpty(body.status)){
    emptyField++;
  }
  
  if(!validator.isEmail(body.email)){
    return res.status(401).json({ mensagem: 'Digite um e-mail válido' });
  }else if(emptyField > 0){
    return res.status(401).json({ mensagem: 'Preencha todos os campos corretamente' });
  }else{
    return next();
  }

};
