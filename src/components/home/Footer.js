import { Link } from '@material-ui/core';
import './home.css';
import * as Fi from "react-icons/fi"
import * as Fa from "react-icons/fa"
import * as Ai from "react-icons/ai"

const Footer =()=>{
    return(
        <footer>
            <div className="main-content">
                <div className="left box">
                <h2>
                    About us
                </h2>
                <div className="content"  >
                    <p>
                        Congresses Medical
                    </p>

                    
                    <div className="social">
                          <a href="#" style={{color:"white",backgroundColor:"transparent"}} >
                            <Fi.FiFacebook /> 
                            </a>
                            {' '}
                            <a href="#" style={{color:"white",backgroundColor:"transparent"}}>
                            <Fi.FiInstagram/> 
                            </a>

                        </div>
                </div>
                </div>
                <div className="center box">
                    <h2>Address</h2>
                    <div className="content">
                        <div className="place">
                           <span> <Fa.FaMapMarkerAlt /></span>
                           <span className="text"> 
                                1006 , Tunis
                           </span>

                        </div>
                        <div className="phone">
                           <span> <Ai.AiOutlinePhone /></span>
                           <span className="text"> 
                                +216 00 000 000
                           </span>

                        </div>
                   
                        <div className="email">
                           <span> <Ai.AiOutlineMail /></span>
                           <span className="text"> 
                           admincongres@gmail.com	
                           </span>

                        </div>
                   
                    </div>


                </div>
                <div className="center box">
                    <h2>Contact</h2>
                    <div className="content">
                        <form>
                            <div className="email">
                            <div className="text">
                                Email*
                            </div>
                            <input  type="email" required />
                            </div>


                            
                            <div className="msg">
                            <div className="text">
                                Message*
                            </div>
                            <textarea  cols="25" rows="2" required >
                            </textarea>
                            </div>
                            <div className="btn">
                                <button type="submit" style={{ borderRadius:"12px" ,width:"100px",  background: "#0568c1"}}>Send</button>
                            </div>

                        </form>
                     </div>

                    
                </div>

              
                </div>
                <hr style={{marginTop:"-4%"}}/>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} THIS CONGRESSES | All right reserved | Terms Of Service | Privacy

                    </p>
                </div>



        </footer>
    )
}

export default Footer