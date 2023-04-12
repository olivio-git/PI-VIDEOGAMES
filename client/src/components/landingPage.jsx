import {Link} from 'react-router-dom'

import fornite from '../assets/lolito.png';


const LandingPage = () => {
    return ( 
        <div className='row landing-page'>
            <div className='col-12'>
                <div className='col-6 cont-png'>
                    <div className='landing-img'>
                    </div>
                </div>
                <div className='col-6 container-banner'>
                    <div className='landing-banner text-scroll'>
                        <span className="span-png">
                            <h1 className="videogames">VIDEOGAMES</h1>
                        </span>
                        <p>Welcome to my Videogame Project!</p>
                        <img className='png-banner' src={fornite} alt="lolito"/>
                        <br />
                        <Link to='/home' >
                            <button className='btn'>Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LandingPage;