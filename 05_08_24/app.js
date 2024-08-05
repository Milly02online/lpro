const express = require('express');

const app = express();

const users = [
  { id: 1, name: 'Alice', status: 'Disponível' },
  { id: 2, name: 'Bob', status: 'Ocupado' },
  { id: 3, name: 'Charles', status: 'Ausente' },
]

//get request
// get localhost: 3000/api/users
app.get('/api/users', (req, res) => {
  // query params
  console.log(req.query);

  // /localhost:3000/api/users?status=Disponivel
  const status = req.query.status;
  if (status) {
    return res.status(200).json(users.filter(user => user.status === status));
  }//

  return res.status(200).json(users);
});
//caminho que 'executa' a func users

//route params
//get localhost:3000/api/users/1
app.get('/api/users/:id', (req, res) => {
  console.log(req.params);
  
  const id = parseInt(req.params.id);
  console.log(id);
  //extrai o id da url
  

  if (isNaN(id)) {
    return res.status(400).json({ error: 'o "id" do usuario deve ser um numero.' });
  }; 
  //verifica se o id informado era realemente umnumero (int)


  const user = users.find(user => user.id === id);
  console.log(user);
  //filtra o usuario com base no id informado

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }; 
  //se nao achar o usuario, erro 404
  //erro 404, caso ele nao exista

  return res.status(200).json(user);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});
//porta e acao que o servidor fará quando o sistema estiver rodando
// chrome: about:blanc f12 (testa visualmente o codigo)                       