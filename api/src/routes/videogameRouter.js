const express = require('express');
const router = express.Router();
const { 
    getAllVideogames,
    getVideogameId,
    getVideogameName,
    postVideogame,
    deleteVideogame,
    getVideogameGenre

}=require('../handlers/videogameHandler')
//Ruta para traer el videogame por nombre o traer todos de una vez

router.get('/:name',getVideogameName)
router.get('/page/:page', getAllVideogames);
router.get('/id/:id',getVideogameId);
router.post('/',postVideogame);
router.delete('/:id',deleteVideogame);
router.get('/sort/:type',getVideogameGenre);
module.exports=router;