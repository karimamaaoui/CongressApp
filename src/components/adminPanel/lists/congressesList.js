import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from  '../sidebarMenu/NavbarMenu';
import { Confirm } from 'react-st-modal';
import { FaSteamSquare } from 'react-icons/fa';
import { Input } from '@material-ui/core';
import { Button } from 'bootstrap';

import{FormControl,Form} from "react-bootstrap";

export class CongressesList extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            listsCong:[],
            lists:[],
            congresid:'',
            search:'',
            searchRes:''
            
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
                const lists=this.state.lists.filter(item =>item.id !==id);
                this.setState({
                    lists
                });
              }).catch(err=>{
           
               
                console.log(err)
              })
            
        }  
      handleSearch=()=>
      {
        
        console.log("eee",this.state.listsCong)
        const newlist = this.state.listsCong.filter((item)=>{
            if(this.state.search == null)
            
                return item
            else if(item.title.toLowerCase().includes(this.state.search.toLowerCase()) || item.description.toLowerCase().includes(this.state.search.toLowerCase())){
                { console.log("new mlist",newlist)}
                { console.log(item)}

                return item
            }
          })
     }


      handlefilter = (e) => {
        this.state.search = e.target.value;
    
        if (this.state.search !== '') {
          const searchRes = this.state.listsCong.filter((item) => {
            return (item.title.toLowerCase().startsWith(this.state.search.toLowerCase()) || item.description.toLowerCase().startsWith(this.state.search.toLowerCase()));
            
            // Use the toLowerCase() method to make it case-insensitive
          })
          console.log(searchRes);

          this.setState({searchRes})
        } 
      };
    
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
        const emails=window.localStorage.getItem('useradmin');
        const emailuser = JSON.parse(emails);
        if(!emails )
        {
            return <p>  error  you should login <button ><Link to="/loginadmin"> Login </Link></button> </p>
        }
        else {
        return (
            <div>   
                           
                    <Navbar />

                    <div>

                        <h1> List </h1>
                        <div >
                                <Form  style ={{

                                padding: "8px 8px",
                                cursor: "pointer",
                                verticalAlign: "middle",
                                marginLeft:"50%"  ,
                                width:"20%"
                                    }}>
                                <FormControl type="text" placeholder="Search "  defaultValue={this.state.search}
                                    onChange={this.handlefilter}
                                    />
                            </Form>
                          
                                </div>
                                <br />
                            <table   style={{alignItems:"center"}} className="table table-striped table-dark able-responsive-md" >  
                                <thead className="thead-dark ">
                                  <tr >
                                    <th>#</th>
                                    <th>title</th>
                                    <th>description</th>
                                    <th>Created At</th>

                                    <th> Action</th>
                                    </tr>
                                    </thead>
                                    {this.state.searchRes.length ===0 ?

                                    this.state.listsCong.map(
                            
                                    item=>{
                                        return(
                                            
                                            <tbody className="table-info">

                                            <tr className="bg-light"  key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.createdAt}</td>
                                                <td><button className="btn btn-warning" onClick={ () => this.handleUpdate(item.id)}>Edit</button>
                                                {' '}
                                                <button className="btn btn-danger"
                                                
                                                onClick={async () => {
                                                    const result = await Confirm('Are you sure you want to delete this one', 
                                                      'Delete Сonfirmation ');
                                                    
                                                    if (result) {
                                                      this.handleDelete(item.id);
                                                      this.props.history.push(`/congresseslist`);
                                          
                                                    } else {
                                                      this.props.history.push(`/congresseslist`);
                                          
                                                  }
                                                  }}
                                                
                                                >
                                                       
                                                    Remove
                                                    
                                                    </button></td>

                                            </tr>
                                            </tbody>
                                            

                                        )

                                    }
                                )
                            :
                            this.state.searchRes.map((item)=> {
                                return(
                                            
                                    <tbody className="table-info">

                                    <tr className="bg-light"  key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.createdAt}</td>
                                        <td><button className="btn btn-warning" onClick={ () => this.handleUpdate(item.id)}>Edit</button>
                                        {' '}
                                        <button className="btn btn-danger"
                                        
                                        onClick={async () => {
                                            const result = await Confirm('Are you sure you want to delete this one', 
                                              'Delete Сonfirmation ');
                                            
                                            if (result) {
                                              this.handleDelete(item.id);
                                              this.props.history.push(`/congresseslist`);
                                  
                                            } else {
                                              this.props.history.push(`/congresseslist`);
                                  
                                          }
                                          }}
                                        
                                        >
                                               
                                            Remove
                                            
                                            </button></td>

                                    </tr>
                                    </tbody>
                                    

                                )
                            }
                                                                           
                                                                           
                                                                           
                                                                           
                                                                           
                                                                           
                                                                           
                                                                           
                                                                           ) 
                                                                                  
                        
                        }
                            </table>
                  

                      </div>


            </div>
            
        )}
    }
}



export default CongressesList;