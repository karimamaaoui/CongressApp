import axios from 'axios';
import React, { Component } from 'react'

export class RegForm extends Component {

    handleSubmit =(e)=>{
        e.preventDefault();

        const data={
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
            password:this.password
        };
        axios.post('https://127.0.0.1:8000/api/register',data)
            .then(res=>{
               console.log(res);
                localStorage.setItem('token',res.data.token);
                this.props.history.push('/home');

            })
            .catch(err=>{
                console.log(err)
            })

    };
    render() {
        return (
            <div>
                <h2>Register </h2>
                
                <form  onSubmit={this.handleSubmit}>    
                <label >first_name</label>
                <input type="text"  onChange={e=>this.firstName=e.target.value} />
                <label >LastName</label>
                <input type="text"  onChange={e=>this.lastName=e.target.value} />
               
                <label >email</label>
                <input type="text"  onChange={e=>this.email=e.target.value} />
                
                <label >password</label>
                <input type="text"  onChange={e=>this.password=e.target.value} />
                
                <input type="submit" value="Register" className="submit" />
     
                </form>

            </div>
        )
    }
}

export default RegForm
