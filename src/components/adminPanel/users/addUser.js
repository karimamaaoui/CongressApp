import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from '../sidebarMenu/NavbarMenu'
import {Form } from 'react-bootstrap'


class AddUser extends Component {

    constructor(props) {
        super(props)
        this.onFormSubmit=this.onFormSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    
        this.state = {
            
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            firstNameError :'',
            lastNameError:'',
            emailError:'',
            passwordError:''
             }
    }
  
  

    handleChange(event)
    {
      this.setState({[event.target.name]:event.target.value})
      
    }
  
onFormSubmit = event => {
        event.preventDefault();
        const data={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password
        };
     console.log(data)

     
    
    const config={
        headers:{
            Authorization: 'Bearer ' +localStorage.getItem('token')      
              
          }
                
        };

        
        console.log(config);
      axios.post('https://127.0.0.1:8000/api/register',data,config)
          .then(res=>{
              console.log(res.data);
            this.props.history.push('/userslist');

              
          })
          .catch(err=>{
            console.log(err)
          })
  
       };


    render() {
        const emails=window.localStorage.getItem('useradmin');
        if(!emails )
        {
            return <p>  error  you should login <button ><Link to="/loginadmin"> Login </Link></button> </p>
        }
        else {
      
          return (
  
              <div>
                    <div><Navbar/> </div>
                    <div className="add-congresses--wrapper">
                    <h1>Add a new User</h1>
                    <br/>
                    <div className="form-group"></div>
  
                  <form  onSubmit={this.onFormSubmit } >
                  <div className="form-group mb-3">
  
                  <label className="mb-2">FirstName</label>
                      <input type="text" required name="firstName"  onChange={this.handleChange}/>
                      <div className=" error" > 
                      {this.state.firstNameError}
                      </div>
                      <Form.Group className="mb-3" >
                      <label className="mb-2">LastName</label>
                      <input type="text" required name="lastName"  onChange={this.handleChange}/>
                      <div className=" error" > 
                      {this.state.lastNameError}
                      </div>
                  </Form.Group>
                      <label className="mb-2">E-mail</label>
                      <input type="email" name="email" required onChange={this.handleChange}  />
                      <div className=" error" > 
                      {this.state.emailError}
                      </div>

  
                      <label className="mb-2">Password</label>
                     <input type="password" required name="password"  onChange={this.handleChange}/>
                        <div className=" error" > 
                    {this.state.passwordError}
                    </div>
        <div className="d-grid mt-3">
                       </div>
                       <button type="submit"  className="btn btn-primary"  id="addbtn"  style={{
  
                      fontSize:" 1.5em",
                      marginLeft: "13em",
                      border:"0px",
                      cursor: "pointer",
                      width:"22%",
                      height:"12%",
                      textAlign:"center",
                      backgroundColor:" rgba(155,208,147, 1)"
  
                        }} >
                         Add 
                         </button>
                     
                  </div>
                  </form>
              </div>
              
         
              </div>
          )
      }}
  }
  
  export default AddUser
