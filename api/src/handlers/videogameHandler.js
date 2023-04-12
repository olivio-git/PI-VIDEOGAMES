const {
    getAllVideogames,
    getAllVideogamesBd,
    getAllVideogamesApi,
    getVideogameNameBd,
    getVideogameNameApi,
    getVideogameNameAll,
    postVideogame,
    getVideogameIdBd,
    getVideogameIdApi,
    deleteVideogame,
    getVideogameGenre
}=require('../controllers/videoGameController')
module.exports={
    getAllVideogames: async (req, res) => {
        const page = req.params.page;
        const from = req.query.from;
        try {
          let inf;
          if (from === 'all') { //inicial
            inf = await getAllVideogames(page);
          } else if (from === 'bd') { //variante
            inf = await getAllVideogamesBd(page);
          } else if (from === 'api') { //variante
            inf = await getAllVideogamesApi(page);
          } else {
            throw new Error('Invalid from parameter');
          }
          res.status(200).json(inf);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      },
      getVideogameId: async (req, res) => {
        const { id } = req.params;
        try {

          if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            // El ID cumple con la sintaxis de un UUID, usar getVideogameIdBd
            const inf = await getVideogameIdBd(id);
  
            res.status(200).json(inf);
          } else {
            // El ID no es un UUID válido, usar getVideogameIdApi
            const inf = await getVideogameIdApi(id);
  
            res.status(200).json(inf);
          }
          
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    },
    getVideogameName: async (req,res)=>{
        const name=req.params.name;
        const from = req.query.from;
        if(name!==' '){
            try {
                switch(from){
                    case 'bd':
                        const Db=await getVideogameNameBd(name);
                        if(!Db.games.length || !name){
                            const inf=await getAllVideogames(1);
                            res.status(200).json(inf);
                        } else {
                            res.status(200).json(Db);
                        }
                    break;
                    case 'api':
                        const Api=await getVideogameNameApi(name);
                        if(!Api.games.length || !name){
                            const inf=await getAllVideogames(1);
                            res.status(200).json(inf);
                        } else {
                            res.status(200).json(Api);
                        }
                    break;
                    case 'all':
                        const DbApi=await getVideogameNameAll(name);
                        if(!DbApi.games.length || !name){
                            const inf=await getAllVideogames(1);
                            res.status(200).json(inf);
                        } else {
                            res.status(200).json(DbApi);
                        }
                    break;
                    default:
                    inf=await getAllVideogames()
                    break;
                }
                
            } catch (error) {
                res.status(400).json({error:error.message});   
            }
        }else{
            res.status(404).Error('No hay datos')
        }
    },
    postVideogame:async (req,res)=>{
        try {
            const inf=await postVideogame(req.body,req.body.genres);
            res.status(200).json(inf);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    },
    deleteVideogame:async(req,res)=>{
      const {id}=req.params;
      try {
        console.log(id)
        const inf=await deleteVideogame(id);
        res.status(200).json({message:inf.message})
      } catch (error) {
       res.status(400).json({error:error.message}) 
      }
    },
    getVideogameGenre:async(req,res)=>{
      const {type}=req.params
      try {
        console.log(type);
        const inf=await getVideogameGenre(type);
        res.status(200).json(inf);
      } catch (error) {
        res.status(400).json({error:error.json})
      }
    }
}