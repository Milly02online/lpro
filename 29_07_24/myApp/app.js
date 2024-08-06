// console.log("Hello World!");

const express = require('express');

const app = express();

//localhost:3000/hello-string
app.get('/hello-string', function (request, response) {
  return response.send('Hello, String!');
});

//localhost:3000/hello-json
app.get('/hello-json', (req, res) => {
  const data = {
    message: "Hello, JSON!",
    nome: "Milly Santos"
  }
  return res.status(201).json(data);

  // return res.json({ message: "Hello, JSON!", nome: "Milly Santos" });
});

//localhost:3000/api/users
const users = [
  { id:1, username: "Irodrigues", status: "Disponível" },
  { 
    id:2,
    username: "joao",
    status: "Ocupado" 
  },
]
users = [
  { id:1, username: "Irodrigues", status: "Disponível" },
  { 
    id:2,
    username: "joao",
    status: "Ocupado" 
  },
]

const PORT = process.env.PORT || 3000;
const onServerStart = function() {
  console.log(`Server is running on port ${PORT}`);
};

// PORT = porta
// $ = concatenação = "porta = 3000" = " 'porta = ' + PORT "

app.listen(PORT, onServerStart);