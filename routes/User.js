const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Usuários');
});

router.get('/create', (req, res) => {
  res.send('Criar Usuário');
});

router.post('/create', (req, res) => {
  res.send('Usuário criado');
});

router.get('/update/:id', (req, res) => {
    res.send('Atualizar');
});

router.post('/update', (req, res) => {
    res.send('Atualizado');
});
router.get('/destroy/:id', (req, res) => {
  res.send('Deletar');  
});


module.exports = router;