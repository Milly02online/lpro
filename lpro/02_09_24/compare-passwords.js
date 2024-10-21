const bcrypt = require('bcrypt');

async function comparePasswords() {
  const data = "minhasenha"; //senha digitada no formulário de login
  const encryped = ".............."; //senha que está no banco de dados

  const result = await bcrypt.compare(data, encryped); //autorização de login (true, false)

  console.log(result);
}

hashPassaword();