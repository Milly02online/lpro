const bcrypt = require('bcrypt');

async function hashPassaword() {
  const saltOrRounds = 10; //10 rodadas p/ aumentar a aleatoriedade da senha
  const data = "minhasenha";

  const hash = await bcrypt.hash(data, saltOrRounds);

  console.log(hash);
}

hashPassaword();