import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from  '../sidebarMenu/NavbarMenu';
import { Confirm } from 'react-st-modal';


export class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists:[],
            currentUserId :'',
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
                axios.delete(`https://127.0.0.1:8000/api/users/${id}`,config)
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
         
    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
        axios.get('https://127.0.0.1:8000/api/users/',config).then(
            res =>{
            const data = res.data;
            const list = data['hydra:member'];
            
            const list3 = data['@id'];
            
            
            console.log('list 3');

            console.log(list3)
            // console.log(list);
         
             this.setState({
                 lists:list
             })
             console.log(this.state.lists)

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
                            
                            <table style={{alignItems:"center"}} className="table table-striped table-dark able-responsive-md" >  
                                <thead className="thead-dark ">
                                  <tr >
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>firstName</th>
                                    <th>lastname</th>
                                    <th>Role</th>
                                    <th>Created At</th>

                                    <th> Action</th>
                                    </tr>
                                    </thead>
                            {this.state.lists.map(
                            
                                    item=>{
                                        return(
                                            
                                            <tbody className="table-info">

                                            <tr className="bg-light"  key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.roles}</td>
                                                <td>{item.createdAt}</td>
                                                <td><button className="btn btn-warning" onClick={ () => this.handleUpdate(item.id)}>Edit</button>
                                                {' '}
                                                <button className="btn btn-danger"
                                                
                                                onClick={async () => {
                                                    const result = await Confirm('Are you sure you want to deactivate this one', 
                                                      'Deactivate Сonfirmation ');
                                                    
                                                    if (result) {
                                                      this.handleDelete(item.id);
                                                      this.props.history.push(`/home`);
                                          
                                                    } else {
                                                      this.props.history.push(`/home`);
                                          
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



export default UsersList;
