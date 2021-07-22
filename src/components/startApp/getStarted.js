
//import wallpaper from '../assets/wallpaper.jpg';
import React from 'react'
import '../startApp/get.css'
import {  Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ControllerCarousel from './ControllerCaroussel';


export class GetStarted extends React.Component {

   

    render() {
       return (
           <div className="body">
            <div className="background">
            <aside>
                    <ControllerCarousel />
                    
                </aside> 
           
         
               <h2 className="title" data-text="Welcome ...">Welcome ...</h2>
               
            <Link  to="/login">
                <Button className="get" variant="dark">
                    Get Started
                </Button>
            </Link>
            </div>   
            
            </div>

        )
        
            
        }
    }
    
export default GetStarted
    


