const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController')

//Get Routes
router.get('/',async(req, res) => {
    await postController.getPosts(req,res);
});

router.get('/publish',authMiddleware.requireAdmin,(req, res) =>{
  res.send('Publicar Postagem');
});

router.get('/:id',authMiddleware.requireAuth,(req, res) => {
  res.send('Visualizar Postagem');
});


router.get('/update/:id',authMiddleware.requireAdmin,(req, res) => {
  res.send('Atualizar Postagem');
});

router.get('/destroy/:id', authMiddleware.requireAdmin,(req, res) => {
  res.send('Deletar Postagem');
});

//Post Routes
router.post('/create',async(req,res) => {
  try {
      const postContent = {
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
    }
    await postController.createPost(req,postContent,res); 
  } catch (error) {
    console.error('Ocorreu um problema ao publicar esta postagem',error);
    res.status(500).send({message:'Ocorreu um problema ao publicar esta postagem'});
  }

  console.log('Postagem publicada com sucesso');
});

router.post('/update/', (req, res) => {
  res.send('Atualizar')
});



module.exports = router;