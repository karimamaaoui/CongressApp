import ReactStars from "react-rating-stars-component";
import Navbar from '../home/navbarList';
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from '../home/Footer'
import Swal from 'sweetalert2'

import React, { Component } from 'react'

export class feedback extends Component {

    constructor(props) {

        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
  
        this.state = {
          stars:'',
          message:'',
          userId:'',
          feedback:[],
        };
    }

    ratingChanged = (stars) => {
        console.log(stars);
        this.setState({
            stars
        });
       
       // this.state.stars=newRating;        
      };

      handleChange(event)
      {
        this.setState({[event.target.name]:event.target.value})
        
      }
      handleSubmit =event=>
      {
        event.preventDefault();
            const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
            console.log("token",config);
            console.log("stars",this.state.stars)
            const userId=window.localStorage.getItem('idUserBook');

            this.state.userId=userId;

            console.log("state",this.state.userId)

            const feedback = {stars: this.state.stars,message:this.state.message,userId:'api/users/'+this.state.userId
        };
            
        console.log("feed",feedback)
        return axios.post(`https://127.0.0.1:8000/api/feedback`,feedback,config).then( (res) =>{
         
         Swal.fire({
                title: "Success!",
                text: "Feedback Added Successfully ",
                icon: 'success',
                button:"OK!"
              });
            console.log(res.data);

           
            
        }) .catch(err=>{
              console.log(err)
        })
    
    }  
    render() {
        const emails=window.localStorage.getItem('users');
            const emailuser = JSON.parse(emails);

            if(!emails )
            {
                return <h1>  error  you should login <button ><Link to="/login"> Login </Link></button> </h1>
            }
            else {
           
        return (
        <div>
            
            <div><Navbar/>
                </div>
            <div className="container border" 
            style={{marginTop:"50px",
            width:"50%",
            backgroundImage:`url('https://st.depositphotos.com/1522993/4737/v/600/depositphotos_47372005-stock-illustration-orange-blue-background-with-triagles.jpg')`,
            backgroundPosition:'center',
            backgroundSize:'cover'
                }}>

                <h1 style={{marginTop:"25px"}}>Feedback </h1>
                <form className="row" style={{margin:"25px 85px 75px 100px"}} onSubmit={this.handleSubmit }>
                    <div>
                    <label>Stars</label>

                    <ReactStars
                        name="stars"
                        count={5}
                        onChange={this.ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        onClick={this.handleStars}
                        className="form-control"
                    />
                    </div>
                    
                    <label>Message</label>
                    
                    <textarea name="message" rows="4" className="form-control" placeholder="What's your feedback" onChange={this.handleChange}/>
                    
                    
                    <input style={{marginTop:"30px"}} type="submit" value="Send" className="form-control btn btn-primary"/>    

                 
                </form>
            </div>
            <br/>
            <br/>
            <Footer id="footer" className="footer"/>

            </div>
        )

        }
    }
}

export default feedback
