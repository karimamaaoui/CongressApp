import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
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
class LoginFormAdmin extends Component {

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
            /*       console.log(this.state)
        } else {
            console.log("Error occured");
        }*/
        const data={
          email:this.state.email,
          password:this.state.password
      };
      console.log(data)
      axios.post('https://localhost:8000/api/admin/login',data)
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


            this.props.history.push('/home');
            localStorage.setItem('useradmin',JSON.stringify(data));

        
          }
          else {
            
            
            this.props.history.push('/loginadmin');

          }
              
          })
          .catch(err=>{
           
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
                        <button id="loginBtn" className="active"  ><strong>LOGIN </strong></button>
                           </div>
                    <div className="form-group"></div>
                <div >

                    <form  onSubmit={this.onFormSubmit } >
                       
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
                    <Link to='/forgotPassword'>
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
                    <Link to='/register'>
                        Register here
                    </Link>
                    </div>

                </div>
                
       
            </div>
            </div>
        );
    }
}
export default LoginFormAdmin
