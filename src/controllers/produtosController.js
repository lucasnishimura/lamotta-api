import Product from '../models/Produto';

class produtosController {
  
  async index(req,res){
    let produtos = await Produtct.find().sort('-createdAt');

    if(req.params.id){
    produtos = await Produtct.findById(req.params.id);
    }
    if(!produtos){
    return res.json({mensagem: 'Nenhum cliente encontrado'});
    }

    return res.json(produtos);
  }

  async store(req,res){
    
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

export default new produtosController();