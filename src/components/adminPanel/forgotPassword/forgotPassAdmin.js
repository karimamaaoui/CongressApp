import React, { Component } from 'react'
import axios from 'axios';
import './resetPassAdmin.css'

import * as Gi from "react-icons/gi";

export class forgotPassAdmin extends Component {


    constructor(props) {
        super(props)
        
      this.handleChange=this.handleChange.bind(this);

    this.state = {
        // retrieve congresses id from the route
      //   id: this.props.match.params.id,
         email:'',
         id:'',
         lists:[]
    }}

    handleChange(event)
    {
      this.setState({[event.target.name]:event.target.value})
      
    }

    onFormSubmit = event => {
        event.preventDefault();
                const config={
                    headers:{
                        Authorization: 'Bearer ' +localStorage.getItem('token')            }
                        
                    };
                    console.log(config)
                axios.get('https://127.0.0.1:8000/api/users/',config).then(
                    res =>{
                    const data = res.data;
                    const list = data['hydra:member'];
                    this.setState({
                         lists:list
                     })
                     console.log(this.state.lists)
                     localStorage.setItem('listOfUsers',JSON.stringify(this.state.lists));
                     this.props.history.push('/reset-password-admin'+ '/' + (this.state.id));


                    },
                    err=>{
                        console.log(err)
                    }
        
                )
                }
  
    render() {
     
     
        const emails=window.localStorage.getItem('listOfUsers');

        const emailuser = JSON.parse(emails);
      
    //    let id;
        return (
            
            <div>

<span>
<Gi.GiReturnArrow style={{marginTop:"1%",
                                    
                                    fontSize: "2rem",
                                    marginLeft:"1rem"
                                }} onClick={this.props.history.goBack}/>
                
                    </span>
             <div className="container">

             <div className="reset-wrapper">
             <div className="form-group"></div>
             <div className="content">
   
            <form  onSubmit={this.onFormSubmit }> 
            <div >
            <div className="form-group mb-3">

                            <label className="labelEmail">Enter your address e-mail</label>
                            <input className="inputEmail"
                                required  style={{
                                    marginBottom: "15px",
                                    fontStretch: "16px",
                                    color:"#999",
                                    padding: "14px 20px",
                                    width: "99%",
                                    display: "inline-block",
                                    border: "1px solid #fff" ,
                                    transition:" 0.3s ease",
                                    background: "#BBE4F3",
                                    borderRadius: "35px",
                                





                                }}
                                type="email" value={this.state.email} onChange={this.handleChange}
                                name="email"
                            />
                        </div>
                        <div className="d-grid mt-3">
                   
                        <button type="submit"   >Send</button>
                   </div>
              </div>

                </form>
                </div>

                </div>
            <div hidden >
             
            {this.state.lists.map(
              item=>{
                 if (this.state.email===item.email)
                return(
                    
                    <div >
                        <p  key={item.id}>

                </p> 
                
                <p> {item.firstName} </p>
                <p> {item.email} </p>
                <p> {item.roles} </p>
                <p> {this.state.id=item.id} </p>
                <p> {console.log(this.state.id)} </p>
                <span>

                {localStorage.setItem('id',JSON.stringify(this.state.id))}
                {localStorage.setItem('username',JSON.stringify(this.state.email))}

                </span>

                </div>

              )}
              
            )}
            </div>            </div>

            </div>
        )
        
    }
    
}

export default forgotPassAdmin
