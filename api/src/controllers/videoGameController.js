const axios=require('axios');
const { Op } = require('sequelize');
require('dotenv').config();
const {
    YOUR_API_KEY
} = process.env;
const { Videogame,Genre } = require('../db');
const pageSize=15;
module.exports={
    getAllVideogames: (page) => {
        return new Promise(async(resolve, reject) => {
        try {
            const allDbGames = await Videogame.findAll({ include: Genre });
            let allGames = [...allDbGames]; 
            for(let i=1;i<6;i++) {
                const apiGames=await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`);
                allGames = allGames.concat(apiGames.data.results);
            }
            const pageGames = allGames.slice((page - 1) * pageSize, page * pageSize); //seleccionamos los juegos que corresponden a la página solicitada 
            const obj={
                page:page,
                totalGame:allGames.length,
                games:[...pageGames]
            }
            resolve(obj);
        } catch (error) {
            reject(error);
        }
        });
    },
    getAllVideogamesBd:(page)=>{
        return new Promise(async(resolve, reject) =>{
            try {
                const allDbGames = await Videogame.findAll({ include: Genre });
                const pageGames = allDbGames.slice((page - 1) * pageSize, page * pageSize);
                const obj={
                    page:page,
                    totalGame:allDbGames.length,
                    games:[...pageGames]
                };
                resolve(obj);
            } catch (error) {
                reject(error);
            }
        })
    },
    getAllVideogamesApi:(page)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                let allGames = []; 
                for(let i=1;i<6;i++) {
                    const apiGames=await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`);
                    allGames = allGames.concat(apiGames.data.results);
                }
                const pageGames = allGames.slice((page - 1) * pageSize, page * pageSize); //seleccionamos los juegos que corresponden a la página solicitada 
                const obj={
                page:page,
                totalGame:allGames.length,
                games:[...pageGames]
                };
                resolve(obj);
            } catch (error) {
                reject(error)
            }
        })
    },
    //Traer los juegos de la api filtrado por id
    getVideogameIdBd: (id) => {
        return new Promise(async (resolve, reject) => {
          try {
            const allDbGames = await Videogame.findOne({
              where: { id },
              include: { model: Genre },
            });
            resolve(allDbGames);
          } catch (error) {
            reject(error);
          }
        });
      },
    getVideogameIdApi:(id)=>{
            return new Promise(async(resolve, reject) =>{
                const allDataApi=await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`);
                resolve(allDataApi.data)
            }
        )
    },
    //Traer los juegos de la api filtrado por nombre
    getVideogameNameBd:(name)=>{
        const pageSize = 15; //Definimos el tamaño de games por pagina
        let page=1;
        return new Promise(async(resolve,reject)=>{
            try {
                const allDataBd = await Videogame.findAll({
                where: {
                name: {[Op.iLike]:`%${name}%`}
                },
                include: [{ model: Genre }]
                });
                const pageGames = allDataBd.slice((page - 1) * pageSize, page * pageSize); //seleccionamos los juegos que corresponden a la página solicitada 
                const obj={
                page:page,
                totalGame:pageGames.length,
                games:pageGames
                }
                resolve(obj);
            } catch (error) {
                reject(error);
            }
        })
    },
    getVideogameNameApi:(name)=>{
        const pageSize = 15; //Definimos el tamaño de games por pagina
        let page=1;
        return new Promise(async(resolve,reject)=>{
            try {
                const allDataApi=await axios.get( `https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);
                const apiData=allDataApi.data.results;
                const pageGames = apiData.slice((page - 1) * pageSize, page * pageSize); //seleccionamos los juegos que corresponden a la página solicitada 
                console.log(pageGames)
                const obj={
                page:page,
                totalGame:pageGames.length,
                games:pageGames
                }
                resolve(obj);
            } catch (error) {
                reject(error);
            }
        })
    },
    getVideogameNameAll:(name)=>{
        const pageSize = 15; //Definimos el tamaño de games por pagina
        let page=1;
        return new Promise(async(resolve,reject)=>{
            try {
                const allDbGames = await Videogame.findAll({
                    where: {
                    name: {[Op.iLike]:`%${name}%`}
                    },
                    include: [{ model: Genre }]
                });
                //obtenemos los juegos desde la API externa
                const apiGames=await axios.get( `https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);
                const apiData=apiGames.data.results;
                const allGames = [...allDbGames, ...apiData]; //unimos los juegos de la base de datos con los obtenidos desde la API externa en un solo array 
                const pageGames = allGames.slice((page - 1) * pageSize, page * pageSize); //seleccionamos los juegos que corresponden a la página solicitada 
                const obj={
                page:page,
                totalGame:pageGames.length,
                games:[...pageGames]
                }
                resolve(obj);
            } catch (error) {
                reject(error);
            }
        })
    },
    postVideogame:(game,genres)=>{//Crear nuevo videojuego recibiendo un game por parametro, y los id de los genres para la relacion
        const {name,description,platforms,image,releaseDate,rating}=game;
        return new Promise(async(resolve,reject)=>{
            if (!name || !platforms || !image || !releaseDate || !rating) {
                reject(Error('Faltan datos obligatorios'));
              }
              try {
                // Crear una nueva instancia de Videogame con los datos recibidos
                const newVideogame =await Videogame.create({
                  name,
                  description,
                  platforms,
                  image,
                  releaseDate,
                  rating:parseFloat(rating),
                });
                // Relacionar el nuevo videojuego con los genres respectivos
                await newVideogame.addGenres(genres);// genres - videogames [1,2,3]
                resolve(newVideogame);
            }catch(error){
                reject(error)
            }
        })
    },
    deleteVideogame:(id)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const videogame = await Videogame.findByPk(id);
                if (!videogame) {
                  reject(Error('Videogame not found'))
                }
                await videogame.destroy(); //delete
                resolve({message:'Destroy succesfully'});
              } catch (error) {
                reject(error)
              }
        })
    },
    getVideogameGenre:async(type)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const t=type.toLowerCase();
                const apiGames=await axios.get(`https://api.rawg.io/api/games?genres=${t}&key=${YOUR_API_KEY}`);
                console.log(apiGames.data.results)
                const apiData=apiGames.data.results
                console.log('aqui',apiData)
                resolve(apiData);
            } catch (error) {
                reject(error);
            }
        })
    }
}