const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const respostas = [];

// Rota para receber os dados do formulário
app.post('/enviar', (req, res) => {
  respostas.push(req.body);
  res.json({ message: 'Resposta recebida com sucesso!' });
});

// Rota para listar as respostas
app.get('/respostas', (req, res) => {
  res.json(respostas);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
