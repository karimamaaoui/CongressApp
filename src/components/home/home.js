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
                noOfElement:3
                
            };
        }
    
        handleUpdate(id)
        {
            this.props.history.push(`/edit/${id}`);

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
    
        }


        

        loadMore =()=>{
            this.setState({
                noOfElement : this.state.noOfElement+this.state.noOfElement
            })
        }
    
        render() {
            const slice=this.state.listsCong.slice(0,this.state.noOfElement);
            console.log(this.state.noOfElement)
            const emails=window.localStorage.getItem('users');
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
                            <MDBCardTitle>{item.title}</MDBCardTitle>
                            <MDBCardText>

                            <ReadMoreReact text={item.description}
                               min={5}
                                ideal={50}
                                 max={100}
                                 readMoreText="click here to read more"/>
                            </MDBCardText>
                          

    
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


                          </div>
                          <Footer id="footer" className="footer"/>

    </div>
                
                
            )}
        }
    
  }
    

export default  Home;
