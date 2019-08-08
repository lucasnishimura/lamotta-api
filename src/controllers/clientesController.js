import Client from '../models/Cliente';

class clientesController {
  
  async index(req,res){
    let clientes = await Client.find().sort('-createdAt');

    if(req.params.id){
    clientes = await Client.findById(req.params.id);
    }
    if(!clientes){
    return res.json({mensagem: 'Nenhum cliente encontrado'});
    }

    return res.json(clientes);
  }

  async store(req,res){
    const userByEmail = await Client.findOne({ email: req.body.email });
    
    if (userByEmail) {
      return res.status(401).json({ mensagem: 'E-mail já existente' });
    }
    
    const { nome, email, telefone, status } = req.body

    const post = await Client.create({
      nome,
      email,
      senha,
      telefone,
      status
    });

    return res.json(post);
  }

  async update(req,res){
    const cliente = await Client.findById(req.body.id);

    if(!cliente){
      return res.json({mensagem: 'Nenhum cliente encontrado'});
    }

    cliente = req.body;
    await cliente.save();
    return res.json(user);
  }

}

export default new clientesController();