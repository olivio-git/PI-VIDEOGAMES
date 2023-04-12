import NavBar from "./navbar";
import { connect } from "react-redux";
import { getGenres } from "../store/actions/genreActions";
import { useEffect, useState } from "react";
import { postVideogames } from "../store/actions/videGameActions";
import Footer from "./footer";
import { Link } from "react-router-dom";
import GenresSelect from "./genresSelect";

const NewGame = ({genres,postVideogames,getGenres}) => {
    const [form,setForm]=useState({
        name:'',
        description:'',
        platforms:[],
        image:'',
        releaseDate:'',
        rating:'',
        genres:[],

        selects:[],
        platform:[
            'Playstation',
            'PC','Xbox',
            'Xbox360',
            'Playstatios V',
            'Gamboi'
        ]
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({
    });

    const validateForm = () => {
        let errors = {};
        let isValid = true;
      
        if (!form.name) {
          errors.name = "Name is required";
          isValid = false;
        } else if (/[^a-zA-Z0-9 ]/.test(form.name)) {
          errors.name = "Name contains invalid characters";
          isValid = false;
        }
      
        if (!form.description) {
          errors.description = "Description is required";
          isValid = false;
        } else if (/[^a-zA-Z0-9 ]/.test(form.description)) {
          errors.description = "Description contains invalid characters";
          isValid = false;
        }
      
        if (!form.rating) {
          errors.rating = "Rating is required";
          isValid = false;
        } else if (form.rating < 1 || form.rating > 5) {
          errors.rating = "Rating must be between 1 and 5";
          isValid = false;
        }
        if (!form.image) {
            errors.image = "Image is required";
            isValid = false;
        } 
        setErrors(errors);
      
        return isValid;
      };
      
    const handleInput=(e)=>{
        const property=e.target.name; //ubicar el nombre el input:target que viene :name
        const value=e.target.value; //ubicar el valor :Mario bros

        if(property!=='genres'){ ///descartamos genres
            if(property!=='platforms') //descartamos plataforms
            {
                setForm({
                    ...form,[property]:value
                })
            }
            else{setForm({
                ...form,platforms:form.platforms.concat(value) 
            })}
        }
        else{
        const index=e.target.selectedIndex+1;
        const txt=e.target.options[index-1];
        setForm({
            ...form,
            genres:form.genres.concat(e.target.value),
            selects:form.selects.concat(txt.text)});
        }
    };
    const resetForm = () => {
        setForm({
          name: '',
          description: '',
          platforms: [],
          image: '',
          releaseDate: '',
          rating: 0,
          genres: [],
          selects: [],
          platform: [
            'Playstation',
            'PC',
            'Xbox',
            'Xbox360',
            'Playstatios V',
            'Gamboi'
          ]
        });
      };      
      const create = (e) => {
        e.preventDefault();
        if (validateForm()) {
          postVideogames({
            name: form.name,
            description: form.description,
            platforms: form.platforms,
            image: form.image,
            releaseDate: form.releaseDate,
            rating: form.rating,
            genres: form.genres,
          }).then(async() => {
            resetForm();
            await setSuccess({
                ...success,
                success:'Creation successful'
            })
            setTimeout(() => {
                setSuccess({})
            }, 10000);
          });
        }
      };
    useEffect(() => {
        const fetchGenres=async()=>{
            await getGenres();
        }
        fetchGenres();
    }, [getGenres]);
    return ( 
        <div className="row container-form-navbar-footer">
            <div className="col-12">
                <NavBar />
            </div>
            <div className="col-12 success-input">
                {success.success && <div className="success"><Link to="/home" >X </Link>{success.success}</div>}
            </div>
            <div className="col-12 container-form">
                <form onSubmit={create} className="form form-create">
                    <label>REGISTER NEW GAME</label>
                    <div className="err-input">
                    <input onChange={handleInput} value={form.name} name="name" type="text" placeholder="name" />
                    {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <label>Genres</label>
                    <select id="register" onChange={handleInput} name="genres">
                    {
                       genres && genres.map(gen=>{
                            return(
                                <option key={gen.id} value={gen.id}>{gen.name}</option>
                            )
                        })
                    }
                    </select>
                    <label>Platforms</label>
                    <select id="register" name="platforms" onChange={handleInput}>
                    {
                      form.platform && form.platform.map(plat=>{
                            return(
                                <option key={plat} value={plat}>{plat}</option>
                            )
                        })
                    }
                    </select>
                    <div className="err-input">
                    <input onChange={handleInput} value={form.description} name="description" type="text" placeholder="Description" />
                    {errors.description && <div className="error">{errors.description}</div>}
                    </div>
                    <div className="err-input">
                    <input onChange={handleInput} value={form.image} name="image" type="text" placeholder="Image"/>
                    {errors.image && <div className="error">{errors.image}</div>}
                    </div>
                    <input onChange={handleInput} value={form.releaseDate} name="releaseDate" type="date" placeholder="Release Date"/>
                    <div className="err-input">
                    <input onChange={handleInput} value={form.rating} name="rating" type="number" placeholder="Rating" />
                    {errors.rating && <div className="error">{errors.rating}</div>}
                    </div>
                    <button className="btn" type="submit" >Save</button>
                    
                </form>
            </div>
            <div className="col-12 platforms-genres">
                  <label>PLATFORMS: </label>
                    {
                      form.platforms && form.platforms.map(m=>{
                        return(
                          <p key={m} >* {m}</p>
                        )
                      })
                    }
                    <label>,GENRES: </label>
                    {
                      form.selects && form.selects.map(m=>{
                        return(
                          <p key={m}>* {m}</p>
                        )
                      })
                    }
            </div>
            <GenresSelect  genres={form.selects} plataforms={form.platforms}  ></GenresSelect>
            <div className="col-12">
                    <Footer></Footer>
            </div>
        </div>
     );
}
const mapStateToProps = (state) => {
    return {
      genres:state.genres
    };
};
  
const mapDispatchToProps = {
    getGenres,
    postVideogames
};
export default connect(mapStateToProps, mapDispatchToProps)(NewGame);;