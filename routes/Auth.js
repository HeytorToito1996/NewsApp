const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get('/', (req, res) => {
  res.send('Autenticação');
});

router.post('/sign-in', async (req, res) => {
   try {
    const userData = {
      email: req.body.email,
      password: req.body.password
    }
    await AuthController.userSignIn(req,userData,res);
   } catch (error) {
      console.error(error);
      res.status(500).json({message:'Error signing in'});
   }
});

router.get('/sign-out',(req,res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      else {
        console.log('Session destroyed');
      }
      res.redirect('/');
  });

});

module.exports = router;