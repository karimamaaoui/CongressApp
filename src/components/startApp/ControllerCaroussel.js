
import {Carousel} from 'react-bootstrap';
import React from 'react';
import wallpaper from '../assets/congres.jpg';
import './get.css'


const  ControllerCarousel =() =>{
  
  return (
    <div className="caroussel">
    <Carousel >
    <Carousel.Item>
      <img
        className="borderimg"
        src={wallpaper}
        alt="First slide" height='350px' 
      />
      <Carousel.Caption>
        <h3>Hope</h3>
        <p>Hope </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="borderimg"
        height='350px'
        src={wallpaper}
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Health</h3>
        <p>Health ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        height='350px'
        className="borderimg"
        src={wallpaper}
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  )
   
}

export default ControllerCarousel ;