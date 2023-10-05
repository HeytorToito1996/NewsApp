const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Notícias');
});

router.get('/:id', (req, res) => {
  res.send('Visualizar Notícia');
});

router.get('/create', (req, res) => {
  res.send('Criar Notícia');
});

router.post('/create', (req,res) => {
  res.send('Notícia publicada'); 
});

router.get('/update/:id', (req, res) => {
  res.send('Atualizar Notícia');
})

router.post('/update/', (req, res) => {
  res.send('Atualizar')
});

router.get('/destroy/:id', (req, res) => {
  res.send('Deletar Notícia');
});

module.exports = router;