const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

//Get Routes
router.get('/',(req, res) => {
  res.send('Notícias');
});

router.get('/publish',authMiddleware.requireAdmin,(req, res) =>{
  res.send('Publicar Notícia');
});

router.get('/:id',authMiddleware.requireAuth,(req, res) => {
  res.send('Visualizar Notícia');
});


router.get('/update/:id',authMiddleware.requireAdmin,(req, res) => {
  res.send('Atualizar Notícia');
});

router.get('/destroy/:id', authMiddleware.requireAdmin,(req, res) => {
  res.send('Deletar Notícia');
});

//Post Routes
router.post('/create',(req,res) => {
  res.send('Notícia publicada'); 
});

router.post('/update/', (req, res) => {
  res.send('Atualizar')
});



module.exports = router;