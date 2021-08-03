import React, { Component } from 'react'
import Navbar from '../home/navbarList';
import axios from 'axios';
import { Link } from "react-router-dom";

  
  export class Home extends Component {
    
        constructor(props) {
            super(props);
            this.state = {
                listsCong:[],
                lists:[],
                congresid:'',
            };
        }
    
        handleUpdate(id)
        {
            this.props.history.push(`/edit/${id}`);

        }

    
            handleDelete (id){
                
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };
                axios.delete(`https://127.0.0.1:8000/api/congres/${id}`,config)
                .then(res => {
                    console.log(res.data);
                    alert("you really want at delete this");
                    const lists=this.state.lists.filter(item =>item.id !==id);
                    this.setState({
                        lists
                    });
                  }).catch(err=>{
               
                   
                    console.log(err)
                  })
                
            }  
          
    
    
    
        componentDidMount()
        {
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };
            axios.get('https://127.0.0.1:8000/api/congres/',config).then(
                res =>{
                const data = res.data;
                
                const list = data['hydra:member'];
             
                 this.setState({
                     listsCong:list
                 })
                 console.log("list congress")
    
                 console.log(this.state.listsCong)
                
                },
                err=>{
                    console.log(err)
                    
                }
    
            )
    
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
    
                        <div><Navbar/>
                        </div>
                        <div>
                            <h1> List of Congress</h1>
                            <Link to ="/add">
    
                            <button className="btn btn-primary"  >Add </button>
                            <br/>

                            </Link>
                            <br/>
                                <table  className="table table-striped table-dark able-responsive-md" >  
                                    <thead className="thead-dark ">
                                      <tr >
                                        
                                        <th>title</th>
                                        <th>description</th>
                                        <th>date</th>
                                        <th hidden>userId</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        </tr>
                                        </thead>
                                {this.state.listsCong.map(
                                
                                        item=>{
                                            
                                            return(
                                                <tbody className="table-info">
    
                                                <tr className="bg-light"  key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.createdAt}</td>
                                                    
                                                    <td><button className="btn btn-warning" onClick={ () => this.handleUpdate(item.id)} >Edit</button></td>
                                                    <td><button className="btn btn-danger" onClick={ () => this.handleDelete(item.id)}>Remove</button></td>
                                                    <td>
    
                                                    </td>
                                                </tr>
                                                </tbody>
    
                                            )
                                        }    
                                        
                                    )
                                    
                                }
                                
                                </table>
                          
                            <div>
                </div>
    
                
                          </div>
    
                    
                </div>
                
            )}
        }
    
  }
    

export default  Home;
