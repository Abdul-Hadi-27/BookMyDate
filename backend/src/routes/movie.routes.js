/*/ eslint-disable no-unused-vars */
/*/ eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express=require('express');
const authMiddleware=require('../middlewares/auth.middleware')
const movieController=require('../controllers/movie.controller');

const multer = require('multer');
 const router=express.Router()
const upload=multer({storage:multer.memoryStorage()})

 router.post('/add-movie',authMiddleware.authUser,authMiddleware.authAdmin,upload.single('poster'),movieController.addMovie)
 router.get('/movies',movieController.getAllMovies)

 router.get('/movies/:id',movieController.getMoviesById)
 router.patch('/movies/update/:id',authMiddleware.authUser,authMiddleware.authAdmin,upload.single('poster'),movieController.updateMovies)
 

router.delete('/movies/delete/:id',authMiddleware.authUser,authMiddleware.authAdmin,movieController.deleteMovie)



 module.exports=router;


