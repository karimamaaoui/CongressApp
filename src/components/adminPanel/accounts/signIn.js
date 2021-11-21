import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { MDBSpinner } from 'mdb-react-ui-kit';
import './sign.css';
import Contact from '../../assets/contact.jpg';
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
/*
const Spinner = () => (
    <div className="spinner">
         <MDBSpinner size='sm' role='status' tag='span' className='me-2' />

    </div>
  );*/
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
 

onFormSubmit = event => {
        event.preventDefault();
        if (validation(this.state)) {
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


            this.props.history.push('/userslist');
            localStorage.setItem('useradmin',JSON.stringify(data));

        
          }
          else {
            
            
            this.props.history.push('/loginadmin');

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
              
            <div className="login-form">
                <div className="container">
                    <div className="main">
                        <div className="content">
                            <h2>Login</h2>
                      

                    <form  onSubmit={this.onFormSubmit } >
                       
                        <div >
                            <label className="labelsign">Email</label>
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

                        <div >
                            <label className="labelsign">Password</label>
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

                     
                    <p >
                    <Link to='/forgotPasswordAdmin'>
                    Forgot Password     
                    </Link>
                    </p>

                        <div>
                        <button type="submit" value="submit"  >submit</button>
                    </div>
                                    <br/>
                    <div className="alreadyhave">
                    Don't  have  an account  {'   '}        
                    <Link to='/registeradmin'>
                        Register here
                    </Link>
                    </div>

                    </form> 
                        </div>
       
                        <div className="form-img">
                    <img src={Contact} alt="contact" />

                </div>

                    </div>
       
            </div>
            </div>
        );
    }
}
export default LoginFormAdmin
