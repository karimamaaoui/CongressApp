import React, { Component } from "react";
import axios from 'axios';
import '../account/form.css';
import {Link} from 'react-router-dom';
//import { Alert } from "bootstrap";
import { MDBSpinner } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'


const regularExpression = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)

const validation = ({ error, ...rest }) => {
    let checkValidation = false;

    Object.values(error).forEach(val => {
        if (val.length > 0) {
            checkValidation = false
        } else {
            checkValidation = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            
            checkValidation = false
        } else {
            checkValidation = true
        }
    });

    return checkValidation;
};

const 
 Spinner = () => (
    <div className="spinner">
         <MDBSpinner size='sm' role='status' tag='span' className='me-2' />

    </div>
  );
class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
            email: '',
            password: '',
            islogged: false,
            loading:true,
            message: '',
            error: {
                email: '',
                password: ''
            }
        }
    }
  /*  showHide=()=>
    {
        if (validation(this.state)) {
            document.getElementById("load").style.display="inline";

        }
        else 
        {
        document.getElementById("load").style.display="none";
        }
    }
*/

  

onFormSubmit = event => {
        event.preventDefault();
        if (validation(this.state)) {
        const data={
          email:this.state.email,
          password:this.state.password
      };
      console.log(data)
      axios.post('https://127.0.0.1:8000/api/login',data)
          .then(res=>{
              
              console.log(res.data);
             localStorage.setItem('token',res.data.token);
            
             this.setState ({    
                islogged: true,
                loading:false,
                message: 'Please wait...'
          });
          console.log(this.state.message);
          console.log(this.state.loading);

          if (this.state.islogged===true)
          {
            if(this.state.loading ===false)
            {
                <Spinner />

            } 


            this.props.history.push('/home');
            localStorage.setItem('users',JSON.stringify(data));

        
          }
          else {
            
            
            this.props.history.push('/login');

          }
              
          })
          .catch(err=>{
           
            //alert("email or password invalid please try again");
           
            Swal.fire({
                title: "Error!",
                text: "Email Or Password Is Invalid Please Try Again",
                icon: 'error',
                button:"OK!"
              });
       
            console.log(err)
          })
  
        }    };


    formObject = event => {

        event.preventDefault();

        const { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
            case "email":
                error.email = regularExpression.test(value)
                    ? ""
                    : "Email is not valid";
                break;
            case "password":
                error.password =
                    value.length < 5 ? "Password should 5 characaters long" : "";
                break;
            default:
                break;
        }

        this.setState({
            error,
            [name]: value
        })
    };

    render() {

        const { error } = this.state;

        return (
              
            <div className="container">

                <div className="login-register-wrapper">
                    <div className="nav-buttons">
                        <button id="loginBtn" className="active" style={{backgroundColor:"transparent",marginLeft:"-19%"}} ><strong>LOGIN </strong></button>
                           </div>
                    <div className="form-group"></div>
                <div >

                    <form  onSubmit={this.onFormSubmit } >
                    {!this.state.loading ? <Spinner /> : null}
                       
                        <div className="form-group mb-3">
                            <label className="mb-2">Email</label>
                            <input
                                required
                                type="email"
                                name="email"
                                className={error.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject}/>
                                {error.email.length > 0 && (
                                <div className="alert alert-danger" role="alert">
                                     {error.email}
                                    </div>
                                )}
                        </div>

                        <div className="form-group mb-3">
                            <label className="mb-2">Password</label>
                            <input
                                required
                                type="password"
                                name="password"
                                className={error.password.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject}/>

                                {error.password.length > 0 && (
                                <div className="alert alert-danger" role="alert">

                                        {error.password}
                                    </div>
                                )}
               
        </div>

                     
                    <div className="forgot" >
                    <Link to='/forgotPassword' style={{color:"#536162"}}>
                    Forgot Password     
                    </Link>
                    </div>


                        <div className="d-grid mt-3">
                   
                        <input type="submit" value="submit" className="submit" />
                        </div>
                       </form>
                    <br/>
                    <div className="already">
                    Don't  have  an account  {'   '}        
                    <Link to='/register' style={{color:"#536162"}}>
                        Register here
                    </Link>
                    </div>

                </div>
                
       
            </div>
            </div>
        );
    }
}
export default LoginForm
