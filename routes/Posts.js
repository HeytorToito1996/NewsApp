const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const upload = require('../config/multer');

//Get Routes
router.get('/',async(req, res) => {
    await postController.getPosts(req,res);
});

router.get('/publish',authMiddleware.requireAdmin,(req, res) =>{
  res.send('Publicar Postagem');
});

router.get('/:id',authMiddleware.requireAuth,async (req, res) => {
   const postId = req.params.id;
   try {
     await postController.getPost(req,postId,res);
   } catch (error) {
      return res.status(500).json({error: error});
   }
});


router.get('/update/:id',authMiddleware.requireAdmin,(req, res) => {
  res.send('Atualizar Postagem');
});

router.get('/destroy/:id', authMiddleware.requireAdmin,async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await postController.deletePost(postId,res);
    } catch (error) {
        console.error('Ocorreu um problema ao Excluir este registro do Banco de dados',error);
        response.status(500).send('Falha ao Excluir esta Postagem');
    }
});

//Post Routes
router.post('/create',upload.single("file"),async(req,res) => {
  try {
      if (!req.file){
         return res.status(404).json({message: 'Nenhuma Imagem Enviada'})
      }

      const postContent = {
        title:req.body.title,
        text:req.body.text,
        picture:req.file.filename,
        author:req.session.name,
        postedAt:new Date().toLocaleString()
    }
    await postController.createPost(req,postContent,res); 
  } catch (error) {
    console.error('Ocorreu um problema ao publicar esta postagem',error);
    res.status(500).send({message:'Ocorreu um problema ao publicar esta postagem'});
  }

  console.log('Postagem publicada com sucesso');
});

router.post('/update/:id',upload.single("file") ,async (req, res) => {
   try {
      if (!req.file){
        return res.status(404).send({message:'Nenhuma Imagem enviada'});
      }
      const postContent = {
         postId: req.params.id,
         title: req.body.title,
         text: req.body.text,
         picture: req.file.filename,
         author: req.session.name,
         postedAt: "Atualizado em : " + new Date().toLocaleString()
      }
      await postController.updatePost(req, postContent,res);
   } catch (error) {
      console.error('Ocorreu um problema ao atualizar esta postagem : ',error); 
      res.status(500).send({message:'Ocorreu um problema ao atualizar esta postagem'})
   }
});



module.exports = router;