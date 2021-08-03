import React, { Component } from 'react'
import axios from 'axios';
import Navbar from '../home/navbarList';
import {Link} from 'react-router-dom';
import '../account/form.css';

import {Form } from 'react-bootstrap'

const initialState ={
    title:'',
    description:'',
    createdAt:'',
    titleError:'',
    descriptionError:'',
    createdAtError:'',

  }
  
export class AddCongresses extends Component {
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
  
    handleSubmit =event=>
    {
      event.preventDefault();

        console.log(this.state);
      const data={
        title:this.state.title,
        description:this.state.description,
        createdAt:this.state.createdAt,
      

    }
    
    console.log(data)
    
    const config={
        headers:{
            Authorization: 'Bearer ' +localStorage.getItem('token')      
              
          }
                
        };

        
        console.log(config)


        axios.post('https://127.0.0.1:8000/api/congres',data,config)
        .then(res=>{
            console.log(res.data);
            
            this.props.history.push('/home');

        })
        .catch(err=>{
            console.log(err)
        })
    
      }
      
    render() {
      const emails=window.localStorage.getItem('users');
      if(!emails )
      {
          return <p>  error  you should login <button ><Link to="/login"> Login </Link></button> </p>
      }
      else {
    
        return (

            <div>
                  <div><Navbar/> </div>
                  <div className="add-congresses--wrapper">
                  <h1>Add new Congresses</h1>
                  <br/>
                  <div className="form-group"></div>

                <form  onSubmit={this.handleSubmit } >
                <div className="form-group mb-3">

                <label className="mb-2">Title</label>
                    <input type="text" required name="title"  onChange={this.handleChange}/>
                    <div className=" error" > 
                    {this.state.titleError}
                    </div>
                    <Form.Group className="mb-3" >
         
                    <label className="mb-2">description</label>
                    <Form.Control as="textarea" rows={3} name="description" required onChange={this.handleChange}/>

                    <div className=" error" > 
                    {this.state.descriptionError}
                    </div>

  </Form.Group>


                    <label className="mb-2">date</label>
                    <input type="datetime-local" name="createdAt" required onChange={this.handleChange}  />
                    <div className=" error" > 
                    {this.state.createdAtError}
                    </div>
                    <div className="d-grid mt-3">

                     </div>
                     <button type="submit"  className="btn btn-primary"  id="addbtn" >
                       Add 
                       </button>
                   
                </div>
                </form>
            </div>
            
       
            </div>
        )
    }}
}

export default AddCongresses
