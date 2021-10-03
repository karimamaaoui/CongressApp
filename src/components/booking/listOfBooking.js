import React, { Component } from 'react'
import Navbar from '../home/navbarList';
import axios from 'axios';
import { Link } from "react-router-dom";
import './listOfBooking.css'
import { Confirm } from 'react-st-modal';
import { MDBCard, MDBCardBody, MDBCardTitle,MDBCardHeader, MDBCardText,MDBCardFooter, MDBCardImage, MDBBtn, MDBRipple,MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import Footer from '../home/Footer'
import ReactStars from "react-rating-stars-component";

export class listOfBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bookings:[],
          congressesList:[],
          salleList:[],
          stars:'',
        };
    }

    ratingChanged = (stars) => {
        console.log(stars);
        this.setState({
            stars
        });
       
       // this.state.stars=newRating;        
      };

    handleStars (id){
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
            console.log("stars",this.state.stars)


        let booking = {stars: this.state.stars};
            
        return axios.put(`https://127.0.0.1:8000/api/bookings/${id}`,booking,config).then( (res) =>{
         
            console.log(res.data);

           
            
        }) .catch(err=>{
            console.log(err)
        })
    
    }  

    handleDelete (id){
                
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
            axios.delete(`https://127.0.0.1:8000/api/bookings/${id}`,config)
            .then(res => {
                console.log(res.data);
                const bookings=this.state.bookings.filter(item =>item.id !==id);
                this.setState({
                    bookings
                });
                alert("remove element")
                 
              }).catch(err=>{
           
               
                console.log(err)
              })
            
        }  
    
    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };

            axios.get('https://127.0.0.1:8000/api/congres',config).then(
                res =>{
                const data = res.data;
                const congressesList = data['hydra:member'];
                this.setState({
                     congressesList:congressesList
                 })
                 console.log("congressesList" ,this.state.congressesList)
    
                },
                err=>{
                    console.log(err)
                    
                })
                axios.get('https://127.0.0.1:8000/api/salles',config).then(
                    res =>{
                    const data = res.data;
                    const salleList = data['hydra:member'];
                    this.setState({
                        salleList:salleList
                     })
                     console.log("salleList" ,this.state.salleList)
        
                    },
                    err=>{
                        console.log(err)
                        
                    })
        
           

            axios.get(`https://127.0.0.1:8000/api/bookings`,config)
            .then(res => {
                console.log(res.data);
                const bookings = res.data['hydra:member'];
                console.log("bookings list",bookings)
             //   const bookings=res.data;
                this.setState({
                    bookings
                });
              }).catch(err=>{
                console.log(err)
              })
            
            }
    render() {  
        
    const userId=window.localStorage.getItem('idUserBook');

    if(!userId )
    {
        return <h1>  error  you should login <button ><Link to="/login"> Login </Link></button> </h1>
    }
    else {
   
    return (
        <div>

                <div><Navbar/>
                </div>
                <div>
                            <h1 style={{fontSize:"3.2em",fontWeight:"900",color:"#4CA1A3"}}> List of Bookings</h1>
                            {' '}
                        <br/>
                </div>
                <div style={{display:"flex",flexWrap: "wrap", alignItems: "center",justifyContent: "space-between",padding:"20px"}  }>
                    
                {this.state.bookings.map(
                            
                            item=>{
                                if (item.user.includes(userId))
                            
        
                        return(
                            <div  >
                                   {this.state.congressesList.map(

    congresItem=>{

        if (item.congres.includes(congresItem.id))

        return(
            <div  >     
            {
                this.state.salleList.map(
                            
                            salleItem=>{
                                if (congresItem.salle.includes(salleItem.id))
                
                                return(     
                                            <div> 
                                                   <MDBCard   style={{ maxWidth: '22rem' ,maxHeight:'40rem'}}>
                                                    
                                                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                                        
                                                        <MDBCardImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwxPkGczHKaWpzuFPivM3gqmEdxMEI4aPELzlyyC7MQRy1I4M9bocB1lkI20tVvvHN5g8&usqp=CAU' fluid alt='...'  width="100%"/>
                                                    
                                                        <MDBCardHeader>Date :  {congresItem.createdAt} </MDBCardHeader>

                                                    </MDBRipple>   
                                                        <MDBCardBody>
                                                        <MDBCardTitle>  Salle :  {salleItem.name}</MDBCardTitle>
                                                        <MDBCardText>
                                                        Congresses Title :  {congresItem.title}
                                                        </MDBCardText>
                                                        <MDBCardText>
                                                        <div>
                                                        <ReactStars
                                                            name="stars"
                                                            count={5}
                                                            onChange={this.ratingChanged}
                                                            size={24}
                                                            activeColor="#ffd700"
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            onClick={this.handleStars(item.id)}
                                                        />
                                                        </div>
                                                        {console.log(this.state.stars)}

                                                        </MDBCardText>

                                                        <MDBBtn 
                                                         onClick={async () => {
                                                            const result = await Confirm('Are you sure you want to remove this one', 
                                                              'Remove Сonfirmation ');
                                                            
                                                            if (result) {
                                                              this.handleDelete(item.id);
                                                              this.props.history.push(`/book`);
                                                         
                                                            } else {
                                                              this.props.history.push(`/book`);
                                                  
                                                          }
                                                          }}
                                                       
                                                        
                                                        > Remove </MDBBtn>



                                                </MDBCardBody>     
                                                </MDBCard>
             </div>
             )}
                )}
                       
            </div>

        )
        })}

                                 </div>)
                                }
                                )
                                }                                                                           
                                </div>

<Footer id="footer" className="footer"/>
              
  
             </div>
        )
    }}
}

export default listOfBooking
