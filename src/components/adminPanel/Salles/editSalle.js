import React, { Component } from 'react'
import axios from 'axios';
import Navbar from  '../sidebarMenu/NavbarMenu';
import {Form } from 'react-bootstrap'
import { Link } from "react-router-dom";



export class editSalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name:'',
            salles:[]
        };
    }

    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
    

        return axios.get('https://127.0.0.1:8000/api/salles' + '/' + (this.state.id),config).then( (res) =>{
            let salles = res.data;
            this.setState({

                name:salles.name
            });
            console.log(salles);

        });

  

    }

        handleEdit = (e) => {
            e.preventDefault();
          
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };

            let salles = {name: this.state.name};
                
            return axios.put('https://127.0.0.1:8000/api/salles' + '/' + (this.state.id),salles,config).then( (res) =>{
             
                console.log(res.data);

                this.setState({
                   salles: res.data
                })
                this.props.history.push('/sallelists');


                
            }) .catch(err=>{
                console.log(err)
            })
        
        }

 
    render(){
        const emails=window.localStorage.getItem('useradmin');

      //  const emailuser = JSON.parse(emails);
        return(
            <div>
                            

            <Navbar />
            <div className="edit-congresses--wrapper">
                        <h1 className="editH1"> Edit Salle </h1>
                        <div className="add-wrapper">
                        <div className="form-group"></div>
                
                 
              <div >
              <form  onSubmit={this.handleEdit } style={{textAlign:"left"}} >
                <div className="form-group mb-3">
                <Form.Group className="mb-3" >

                <label className="mb-2">Salle</label>
                    <input type="text" required name="name"  defaultValue={this.state.name}  onChange={(e)=>this.setState({name:e.target.value})} />
            
               </Form.Group>

                </div>
                <Form.Group>
                <input type="submit" value="edit" className="submit"style={{
                    fontSize:" 1.5em",
                    marginLeft: "13em",
                    border:"0px",
                    cursor: "pointer",
                    width:"22%",
                    height:"12%",
                    textAlign:"center",
                    backgroundColor:" rgba(155,208,147, 1)"

                    }}  />
                </Form.Group>
                </form>
                </div>
                
                 </div>
              </div>
            
        </div>
        
        )
    }
    }

export default editSalle
