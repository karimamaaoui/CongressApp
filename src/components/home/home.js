import React, { Component } from 'react'
import Navbar from '../home/navbarList';
import axios from 'axios';
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardTitle,MDBCardHeader, MDBCardText,MDBCardFooter, MDBCardImage, MDBBtn, MDBRipple,MDBRow, MDBCol } from 'mdb-react-ui-kit';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ReadMoreReact from 'read-more-react';
import { Confirm } from 'react-st-modal';



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
    
        render() {
    
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
                            <Link to ="/add">
    
                            <button className="btn btn-primary" style={{align:"center",marginLeft:"30px",padding:"10px"}}  >Add  new congresses</button>
                            <br/>

                            </Link>
                                
                            <div  style={{display:"flex",flexWrap: "wrap", alignItems: "center",justifyContent: "space-between",padding:"20px"}  }>     
                            {this.state.listsCong.map(
                             item=>{
                            
                    return(
                        
                        <div   key={item.id}>
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
                            <MDBBtn  className="btn btn-warning" onClick={ () => this.handleUpdate(item.id)}>Editer</MDBBtn>{'   '}
                        
      <MDBBtn className="btn btn-danger"
        onClick={async () => {
          const result = await Confirm('Are you sure you want to delete this one', 
            'Delete Сonfirmation ');
          
          if (result) {
            this.handleDelete(item.id);
            this.props.history.push(`/home`);

          } else {
            this.props.history.push(`/home`);

        }
        }}
      >
            Remove  
      </MDBBtn>
    

    
    </MDBCardBody>
                        
    </MDBCard>
                </div>
            )
     
     }
     
     )}

      

    

  </div>


                          </div>
    
                    
                </div>
                
            )}
        }
    
  }
    

export default  Home;
