
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
        src="https://medicine.umich.edu/sites/default/files/styles/alt_carousel/public/carousel-images/lowenstein_in_lab(carousel).jpg?itok=DdD9midf"
        alt="First slide" height='350px'  width='595px'
      />
      <Carousel.Caption>
        <h3 style={{color:"#9FE6A0",fontSize:'25px ',fontWeight:'bold'}}> WELCOME</h3>
        <p style={{color:"#9FE6A0",fontSize:'17px',fontWeight:'bold'}}>
          We organize more than 20 congresses and medical events every year </p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="borderimg"
        height='350px'
        width='595px'
        src={wallpaper}
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3 style={{color:"#9FE6A0",fontSize:'25px ',fontWeight:'bold'}} >WELCOME</h3>
        <p style={{color:"#9FE6A0",fontSize:'17px',fontWeight:'bold'}}>It’s thanks to our teams that we are able to provide high quality medical knowledge to our customers .</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        height='350px'width='595px'
        className="borderimg"
        src="https://www.prevuemeetings.com/wp-content/uploads/2017/08/medical-meetings.jpg"
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3 style={{color:"#9FE6A0",fontSize:'25px ',fontWeight:'bold'}}>WELCOME</h3>
        <p style={{color:"#9FE6A0",fontSize:'17PX ',fontWeight:'bold'}}>
         
        We rely on our team of 10 dedicated people
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  </div>
  )
   
}

export default ControllerCarousel ;