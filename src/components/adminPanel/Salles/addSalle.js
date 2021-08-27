import React, { Component } from 'react'
import axios from 'axios';
import Navbar from '../sidebarMenu/NavbarMenu'

export class addSalle extends Component {
    constructor(props)
    {
      super(props);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChange=this.handleChange.bind(this);
  
      this.state={
          salles: [],
          name:''
      }
        
      
    }
    handleChange(event)
    {
      this.setState({[event.target.name]:event.target.value})
      
    }
  
  
    handleSubmit =event=>
    {
      event.preventDefault();
      
    const config={
      headers:{
          Authorization: 'Bearer ' +localStorage.getItem('token')      
            
        }
              
      };

      
      
      const data={
        name:this.state.name,
       
    }
    
    console.log(data)
    
    
    axios.post('https://127.0.0.1:8000/api/salles',data,config)
        .then(res=>{
            console.log("dddd",res.data);
            console.log("id",res.data["@id"])
            
            console.log("succes")
            this.props.history.push('/sallelists');

            this.setState({
                salles:res.data
            })            
        })
        .catch(err=>{
            console.log("error")

            console.log(err)
        })
    
      }
  

    render() {
        return (
            
          <div>
          <div><Navbar/> </div>
          <div className="add-congresses--wrapper">
          <h1>Add new Salle</h1>
          <br/>
          <div className="form-group"></div>

                 <form  onSubmit={this.handleSubmit } >
                <div className="form-group mb-3">

                <label className="mb-2">Name Salle</label>
                    <input type="text" required name="name"  onChange={this.handleChange}/>
                    </div>
                    
                    
                     <button type="submit"  className="btn btn-primary"  id="addbtn"  style={{

                    fontSize:" 1.5em",
                    marginLeft: "13em",
                    border:"0px",
                    cursor: "pointer",
                    width:"22%",
                    height:"12%",
                    textAlign:"center",
                    backgroundColor:" rgba(155,208,147, 1)"

                      }} >
                       Add 
                       </button>
                
            </form>
            </div>
            </div>
        )
    }
}

export default addSalle
