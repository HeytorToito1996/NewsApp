const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', (req, res) => {
  res.send('Usuários');
});

router.get('/create', (req, res) => {
  res.send('Criar Usuário');
});

router.post('/create', async (req, res) => {
    try {
      const userData = {
          name:req.body.name,
          email:req.body.email,
          password:req.body.password
      }
      const newUser = await userController.createUser(userData,res);
    } catch (error) {
      console.error('Ocorreu um problema ao cadastrar este usuário',error);
      res.status(500).send({message:'Ocorreu um problema ao cadastrar este usuário'});
    }
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