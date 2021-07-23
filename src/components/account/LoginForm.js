import React, { Component } from 'react'
//import wallpaper from '../assets/wallpaper.jpg';
import './form.css';
import {Link} from 'react-router-dom';
//import { Alert } from 'reactstrap';
//import { Alert } from 'reactstrap';
import axios from 'axios';


const initialState ={
  email:'',
  password:'',
  emailError:'',
  passwordError:'',
  items:[]

}


class LoginForm extends Component {
    data;
    constructor(props)
    {
      super(props);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChange=this.handleChange.bind(this);
  
      this.state=initialState;
        
      
    }
    handleChange(event)
    {
      this.setState({[event.target.name]:event.target.value})
      
    }
  
    handleSubmit(event)
    {
      event.preventDefault();
      const isValid =this.handleValidate();
      if(isValid)
      {
        //this.props.history.push('/home');
        //console.log(this.state);
      //  localStorage.setItem('users',JSON.stringify(this.state))
      const data={
        email:this.state.email,
        password:this.state.password
    };
    console.log(data)
    axios.post('https://127.0.0.1:8000/api/login',data)
        .then(res=>{
           // console.log(res);
           localStorage.setItem('token',res.data.token);
            this.props.history.push('/home');

        })
        .catch(err=>{
            console.log(err)
        })

      }
      
     }


     handleValidate =()=>{
          let emailError="";
          let passwordError='';
      
        
          if (!this.state.password ||this.state.password.length < 6)
          {
            
                passwordError='password invalid'; 
                
      
          }
      
  
      if (!this.state.email.includes('@'))
          {
            emailError='invalid email'; 
  
          }
  
  
         
        if( emailError ||passwordError  )
        {
          this.setState({emailError,passwordError});
          return false;
        }       
  
        return true;
     }
   
     RegisterForm =()=> {
        return (
          <React.Fragment>
            <label for="fullname">full name</label>
            <input type="text" id="fullname" />
            <label for="email">email</label>
            <input type="text" id="email" />
            <label for="password">password</label>
            <input type="text" id="password" />
            <label for="confirmpassword">confirm password</label>
            <input type="text" id="confirmpassword" />
            <input type="submit" value="submit" class="submit" />
          </React.Fragment>
        );
      }


    render() {
        return (
            <div className="container">
                <div className="login-register-wrapper">
                    <div className="nav-buttons">
                        <button id="loginBtn" className="active"  >Login</button>
                           </div>
                    <div className="form-group">
                    <form  onSubmit={this.handleSubmit}>    
                    
                    <React.Fragment>
                    
                    <label >EMAIL</label>
                    <input type="email" name="email"  placeholder="enter address email" className="form-control" value={this.state.email} onChange={this.handleChange}/>
                    <div className="alert alert-danger" role="alert">

                      {this.state.emailError}

                    </div>
                    <label >PASSWORD</label>
                    <input type="password" name="password" placeholder="enter password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
                    <div className=" error" > 
                    {this.state.passwordError}
                    </div>
         
                    <br/>
                    <span className="forget">
                   
                   <Link to='/'>
                       <p>Forget Password</p>
                   </Link>
                    </span>
       
                    <input type="submit" value="submit" className="submit" onClick={this.handleAlert}  />
                    </React.Fragment>            
                    </form>

                    </div>
                    <div className="already">
                    Don't  have  an account  {'   '}        
                    <Link to='/register'>
                        Register here
                    </Link>
                    </div>

                </div>
            </div>
        )
    }
}
export default LoginForm;