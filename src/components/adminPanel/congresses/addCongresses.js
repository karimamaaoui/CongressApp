import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from '../sidebarMenu/NavbarMenu'
import {Form } from 'react-bootstrap'

const initialState ={
    title:'',
    description:'',
    createdAt:'',
    salles:[],
    salle:'',
    titleError:'',
    descriptionError:'',
    createdAtError:'',
    salleError:'',
    names:''

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
  

    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };


        axios.get('https://127.0.0.1:8000/api/salles/',config).then(
            res =>{
              
            
            const datasalle = res.data;
            const list = datasalle['hydra:member'];
         
             this.setState({
                 salles:list
             })
             console.log("list salle",this.state.salles);

            },
            err=>{
                console.log(err)
                
            }

        )

    }

    handleSelect (id){
            
      const config={
          headers:{
              Authorization: 'Bearer ' +localStorage.getItem('token')            }
              
          };
          axios.get(`https://127.0.0.1:8000/api/salles/${id}`,config)
          .then(res => {
              
            const datasalle = res.data;
            const list = datasalle['hydra:member'];
         
               }).catch(err=>{
         
             
              console.log(err)
            })
          
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
        title:this.state.title,
        description:this.state.description,
        createdAt:this.state.createdAt,
        salle:'/api/salles/'+this.state.names

    }
    
    console.log(data)
    
    console.log("salle id :",this.state.salle)
    
    axios.post('https://127.0.0.1:8000/api/congres',data,config)
        .then(res=>{
            console.log(res.data);
            
            this.props.history.push('/congresseslist');

        })
        .catch(err=>{
            console.log(err)
        })
    
      }
      selectState =(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        this.state.names=value;
    
        console.log (this.state.names);

      }
      
    render() {
      const emails=window.localStorage.getItem('useradmin');
      if(!emails )
      {
          return <p>  error  you should login <button ><Link to="/loginadmin"> Login </Link></button> </p>
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
                    <Form.Control as="textarea" rows={10} name="description" required onChange={this.handleChange}/>
                    <div className=" error" > 
                    {this.state.descriptionError}
                    </div>
                </Form.Group>
                    <label className="mb-2">date</label>
                    <input type="datetime-local" name="createdAt" required onChange={this.handleChange}  />
                    <div className=" error" > 
                    {this.state.createdAtError}
                    </div>
                    <div className="col-sm-3">
                    <label className="mb-2">Select Salle</label>
                   
                      <select className="form-control" name="salle"  onChange={this.selectState}  >  
                                                <option>Salle</option>  
                                                {this.state.salles.map((item, key) => {  
                                                        return <option key={key} value={item.id}>{item.name}</option>;  
                                                })}  
                                        </select>  
                    </div>
           
                    <div className="d-grid mt-3">
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
                   
                </div>
                </form>
                
                       </div>
            
       
            </div>
        )
    }}
}

export default AddCongresses
