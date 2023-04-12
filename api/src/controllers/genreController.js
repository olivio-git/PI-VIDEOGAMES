const axios=require('axios')
require('dotenv').config();
const {
    YOUR_API_KEY
} = process.env;
const { Genre } = require('../db');
module.exports={
    getAllGenres:()=>{
        return new Promise(async(resolve, reject) => {
            try {
                const response=await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
                
                const genres= await response.data.results.map(gen=>gen.name);
                const genre=genres.toString().split(',');

                genre.forEach(async(name)=>{
                    await Genre.findOrCreate({
                        where:{name:name}
                    })
                })

                const allGenres=await Genre.findAll(); //consultas todos los generos de la db

                resolve(allGenres);

            } catch (error) {
                reject(error);
            }
        })
    },
    createGenre:(genre)=>{
        return new Promise(async(resolve,reject)=>{
            if(!genre.name){
                reject(new Error('Faltan datos'))
            }
            try {
             const newGenre=await  Genre.create({
                name:genre.name
            });
                resolve(newGenre);
            }catch (error) {
                reject(error)
            }
      });
    },
}