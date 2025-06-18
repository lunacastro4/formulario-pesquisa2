const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Porta dinâmica para funcionar no Render e local
const PORT = process.env.PORT || 3000;

// Configuração do servidor
app.use(cors());
app.use(express.json());

// Caminho do arquivo de respostas
const arquivo = 'respostas.json';

// Se o arquivo não existir, cria um arquivo JSON vazio
if (!fs.existsSync(arquivo)) {
  fs.writeFileSync(arquivo, '[]', 'utf8');
}

// Rota para receber respostas do formulário
app.post('/enviar', (req, res) => {
  const novasRespostas = req.body;
  const respostas = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
  respostas.push(novasRespostas);
  fs.writeFileSync(arquivo, JSON.stringify(respostas, null, 2), 'utf8');
  res.json({ sucesso: true });
});

// Rota para visualizar todas as respostas (painel simples)
app.get('/respostas', (req, res) => {
  const respostas = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
  res.json(respostas);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
