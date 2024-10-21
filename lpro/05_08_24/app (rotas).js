const express = require('express');

const app = express();
app.use(express.json());

const times = ["Palmeiras", "Corinthians", "Flamengo"];
const time = "";

app.post('/api/new-game', (req, res) => {
  const getRandomTime = () => {
    const randowIndex = Math.floor(Math.random() * time.length);
    return times(randomIndex);
  };

  time = getRandomTime();

  res.json({ time });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});

//porta e acao que o servidor fará quando o sistema estiver rodando
// chrome: about:blanc f12 (testa visualmente o codigo)                    