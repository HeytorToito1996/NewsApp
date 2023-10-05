const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Autenticação');
});

router.post('/', (req, res) => {
  res.send('Autenticado');
})

module.exports = router;