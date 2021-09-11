import React, { Component } from 'react'
import Navbar from '../home/navbarList';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle,MDBCardHeader, MDBCardText,MDBCardFooter, MDBCardImage, MDBBtn, MDBRipple,MDBRow, MDBCol } from 'mdb-react-ui-kit';

import ReadMoreReact from 'read-more-react';
import { Confirm } from 'react-st-modal';

import Footer from './Footer'
import { Button } from 'bootstrap';

  export class Home extends Component {

  

 handleClickOpen = () => {
    this.setState({
        open:true
    });
  };
 handleClose = () => {
    this.setState({
        open:false
    });
  };


        constructor(props) {
            super(props);
            this.state = {
                listsCong:[],
                lists:[],
                congresid:'',
                userid:'',
                noOfElement:3,
                users:[]
                
            };
        }
    
        handleUpdate(id)
        {
            this.props.history.push(`/edit/${id}`);

        }
        
        handleBooking(idcongres)
        {

            
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };
                axios.get(`https://127.0.0.1:8000/api/congres/${idcongres}`,config)
                .then(res => {
                    
                  const datacongres = res.data;
                    console.log(datacongres)

                     }).catch(err=>{
               
                   
                    console.log(err)
                     })
                 
            const data={
                user:'api/users/'+this.state.userid,
                congres:'api/congres/'+idcongres,
                    
                        }          
                        console.log("data=",data)
                        console.log("id user",this.state.userid);
                        console.log("id congres",idcongres);
                        
                axios.post(`https://127.0.0.1:8000/api/bookings`,data,config)
                .then(res => {
                    console.log(res.data);
                }).catch(err=>{
                    console.log(err)
                  })
                
        }
    
            handleDelete (id){
                
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };
                axios.delete(`https://127.0.0.1:8000/api/congres/${id}`,config)
                .then(res => {
                    console.log(res.data);
                    const lists=this.state.lists.filter(item =>item.id !==id);
                    this.setState({
                        lists
                    });
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
            axios.get('https://127.0.0.1:8000/api/congres/',config).then(
                res =>{
                const data = res.data;
                
                const list = data['hydra:member'];
             
                 this.setState({
                     listsCong:list
                 })
                 console.log("list congress")
    
                 console.log(this.state.listsCong)
                
                },
                err=>{
                    console.log(err)
                    
                }
    
            )
    


            axios.get('https://127.0.0.1:8000/api/users/',config).then(
                res =>{
                const data = res.data;
                const user = data['hydra:member'];
                
                
             
                 this.setState({
                     users:user
                 })
                 console.log(this.state.users)
    
                },
                err=>{
                    console.log(err)
                    
                }
    
            )
    
            
        }


        

        loadMore =()=>{
            this.setState({
                noOfElement : this.state.noOfElement+this.state.noOfElement
            })
        }
    
        render() {
            const slice=this.state.listsCong.slice(0,this.state.noOfElement);
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

                        <div>
                            <h1 style={{fontSize:"3.2em",fontWeight:"900",color:"#4CA1A3"}}> List of Congresses</h1>
                            <div  style={{display:"flex",flexWrap: "wrap", alignItems: "center",justifyContent: "space-between",padding:"20px"}  }>     
                            {slice.map(
                             (item,index)=>{
                            
                    return(
                        
                        
                        <div   key={index}>
    
                        <MDBCard   style={{ maxWidth: '22rem' ,maxHeight:'40rem'}}>
     
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                            
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/111.jpg' fluid alt='...' />
                            <MDBCardHeader>Date : {item.createdAt}</MDBCardHeader>

                        </MDBRipple>   
                            


                        <MDBCardBody>
                            <MDBCardTitle>{item.title} </MDBCardTitle>
                            <MDBCardText>
                            <ReadMoreReact text={item.description} 
                                min={5}
                                ideal={50}
                                 max={100}
                                 readMoreText="click here to read more"/>
                            </MDBCardText>
    
    
                            <MDBBtn  onClick={async () => {
                                                    const result = await Confirm('Are you sure you want to book this one', 
                                                      'Booking Сonfirmation ');
                                                    
                                                    if (result) {
                                                      this.handleBooking(item.id);
                                                      {console.log("id",item.id)}
                                                      this.props.history.push(`/home`);
                                          
                                                    } else {
                                                      this.props.history.push(`/home`);
                                          
                                                  }
                                                  }}
                                                
                                                >
                                               Book</MDBBtn>


    
    </MDBCardBody>
                        
    </MDBCard>
    
                </div>
            )
     }
     )}

  </div>
     <button className="btn btn-dark d-block w-30 "style={{textAlign:"center" , marginLeft:"45%", marginBottom:'2%'}} onClick ={()=> this.loadMore() }  >
         Load More
     </button>
     <div hidden>
     {this.state.users.map(
                            
                            user=>{

                            
                            if (user.email=== emailuser.email) 
                            {
                                return(
                                    <p>
                                        
                                        {this.state.userid=user.id} {user.firstName}</p>
                                )}})}
     
     </div>


                          </div>
                          <Footer id="footer" className="footer"/>

    </div>
                
                
            )}
        }
    
  }
    

export default  Home;
