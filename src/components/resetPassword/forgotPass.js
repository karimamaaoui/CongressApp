import React, { Component } from 'react'
import axios from 'axios';
import './reset.css'
export class forgotPass extends Component {


    constructor(props) {
        super(props)
        
      this.handleChange=this.handleChange.bind(this);

    this.state = {
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
                     this.props.history.push('/reset-password'+ '/' + (this.state.id));


                    },
                    err=>{
                        console.log(err)
                    }
        
                )
                }
  
    render() {
     
     
    //    const emails=window.localStorage.getItem('listOfUsers');

      //  const emailuser = JSON.parse(emails);
      
    //    let id;
        return (
            
            <div>

             <div className="container" >

             <div className="reset-wrapper">
             <div className="form-group" ></div>

            <form  onSubmit={this.onFormSubmit }style={{marginTop:'5em'}}> 
            <div >
            <div className="form-group mb-3">

                            <label className="mb-2">Enter your address e-mail</label>
                            <input
                                required
                                type="email" value={this.state.email} onChange={this.handleChange}
                                name="email"
                            />
                        </div>
                        <div className="d-grid mt-3">
                   
                   <input type="submit" value="submit" className="submit"/>
                   </div>
              </div>
                </form>
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

export default forgotPass
