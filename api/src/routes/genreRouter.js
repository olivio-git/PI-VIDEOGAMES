const express = require('express');
const router = express.Router();
const {
    getAllGenres,
    createGenre
}=require('../controllers/genreController');
//Ruta para traer todos los genres
router.get('/',async(req,res)=>{
    try {
        const inf=await getAllGenres();
        res.status(200).json(inf);
    } catch (error) {
        res.status(error).json({error:error.message});
    }
});

module.exports=router