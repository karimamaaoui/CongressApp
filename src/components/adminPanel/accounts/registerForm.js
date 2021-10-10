import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
//import {Alert} from 'react-bootstrap';
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

class RegisterFormAdmin extends Component {

    

    constructor(props) {
        super(props)

        this.state = {
            firstName:'',
            lastName:'',
            email: '',
            password: '',
            error: {
                email: '',
                password: '',
                firstName:'',
                lastName:'',
             
            }
        }
    }

    onFormSubmit = event => {
        event.preventDefault();

        if (validation(this.state)) {
     /*       console.log(this.state)
        } else {
            console.log("Error occured");
        }*/
        const data={
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          email:this.state.email,
          password:this.state.password
      };
      console.log(data)
      axios.post('https://localhost:8000/api/admin/register',data)
          .then(res=>{
             // console.log(res);
             localStorage.setItem('token',res.data.token);
             

             Swal.fire({
                title: "Success!",
                text: "Account Created Successfully ",
                icon: 'success',
                button:"OK!"
            });
              this.props.history.push('/loginadmin');
              
          localStorage.setItem('useradmin',JSON.stringify(data));
         
          })
          .catch(err=>{
            Swal.fire({
                title: "Error!",
                text: "Email already exists",
                icon: 'error',
                button:"OK!"
              });
       
              console.log(err)
          })
  
        } 
    };


    formObject = event => {

        event.preventDefault();

        const { name, value } = event.target;
        let error = { ...this.state.error };

        switch (name) {
          case "firstName":
            error.firstName =
                value.length < 3 ? "firstName should 3 characaters long" : "";
            break;
            case "lastName":
              error.lastName =
                  value.length < 3 ? "lastName should 3 characaters long" : "";
              break;
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
                    <h2>Register</h2>

                    <form  onSubmit={this.onFormSubmit }>
           
                    <div >
                            <label className="labelsign" >FirstName</label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                className={error.password.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject}/>

                                {error.firstName.length > 0 && (
                                       <div className="alert alert-danger" role="alert">
                                     {error.firstName}
                                    </div>
                             
                                )}
                        </div>

                        <div >
                            <label className="labelsign">LastName</label>
                            <input
                                required
                                type="text"
                                name="lastName"
                                className={error.lastName.length > 0 ? "is-invalid form-control" : "form-control"}
                                onChange={this.formObject}/>

                                {error.lastName.length > 0 && (
                                    <div className="alert alert-danger" role="alert">
                                    {error.lastName}
                                    </div>

                                )}
                        </div>


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

                        <div >
                        <button type="submit" value="submit"  >Register</button>

                        </div>
                                    <br/>
                        <div className="alreadyhave">
                    Don't  have  an account  {'   '}        
                    <Link to='/loginadmin'>
                        Login here
                    </Link>
                    </div>

                    
                    </form>
                    
                    
                </div>
                   <div className="form-img">
                    <img src={Contact} alt="contact" />
                    </div>

</div>
            </div>            </div>
        );
    }
}
export default RegisterFormAdmin
