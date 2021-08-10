import axios from 'axios';
import React, { Component } from 'react'
import './reset.css'
export class FogotPassword extends Component {
    constructor(props) {
        super(props)
        
      this.handleChange=this.handleChange.bind(this);

    this.state = {
        // retrieve congresses id from the route
         id: this.props.match.params.id,
         newPassword:'',
        lists:[],
            
        
    
    }}

    onFormSubmit = event => {
        event.preventDefault();
              
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token') }
                
            };
            console.log(config)
           /* const data={
                newPassword:this.state.newPassword
            }*/
            let motdepasse = {newPassword:this.state.newPassword};            
          //  console.log(data)

          return axios.put( 'https://127.0.0.1:8000/api/api/users/'+(this.state.id)+'/reset-password',motdepasse,config).then( (res) =>{

                console.log(res.data);
                this.setState({
                   newPassword: res.data
                })
                this.props.history.push('{/login');

            }) .catch(err=>{
                console.log(err)
            })  
        
            }
    
    handleChange(event)
    {
      this.setState({[event.target.name]:event.target.value})
      
    }

    render() {
        const email=localStorage.getItem('username','value');
        const username=email.substring(1, email.length - 1)

        const firstPart = username.substr(0,3);
        const secondPart = username.split('@')[1];

        const res = firstPart.concat("********").concat(secondPart);
        

        return (
            <div className="container">
                <h2>{res}</h2>
                <div className="reset-wrapper">

                <div className="form-group"></div>

            <form  onSubmit={this.onFormSubmit }> 
            <div className="form-group mb-3">
                
                            <label className="mb-2">Password</label>
                            <input
                                required
                                type="password" value={this.state.password} onChange={this.handleChange}
                                name="newPassword"
                            />
                        </div>
                        <div className="d-grid mt-3">
                   
                   <input type="submit" value="submit" className="submit"/>
                   </div>
              
                </form>
                </div>
            </div>
        )
    }
}

export default FogotPassword
