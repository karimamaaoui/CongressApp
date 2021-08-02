import React, { Component } from 'react'
import axios from 'axios';
import Navbar from '../home/navbarList';
import {Link} from 'react-router-dom';


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
 
        //this.props.history.push('/home');
        console.log(this.state);
      //  localStorage.setItem('users',JSON.stringify(this.state))

      //const userId=localStorage.getItem('userId');

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
      const emailuser = JSON.parse(emails);
    // const redirectToUrl = <Redirect to="/login" />;
      if(!emails )
      {
          return <p>  error  you should login <button ><Link to="/login"> Login </Link></button> </p>
          //<NoRouteFound/>
          //  {redirectToUrl}
      }
      else {
    
        return (

            <div>
                  <div><Navbar/> </div>

                <form  onSubmit={this.handleSubmit } >
                
                <label className="mb-2">Title</label>
                    <input type="text" required name="title"  onChange={this.handleChange}/>
                    <div className=" error" > 
                    {this.state.titleError}
                    </div>
         
                    <label className="mb-2">description</label>
                    <input type="textarea" name="description" required onChange={this.handleChange}  />
                    <div className=" error" > 
                    {this.state.descriptionError}
                    </div>
                    <label className="mb-2">date</label>
                    <input type="text" name="createdAt" required onChange={this.handleChange}  />
                    <div className=" error" > 
                    {this.state.createdAtError}
                    </div>
                   
                     <input type="submit" value="submit" />

                </form>
            </div>
        )
    }}
}

export default AddCongresses
