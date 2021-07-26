import React, { Component } from 'react'
import Navbar from '../home/navbarList';
import axios from 'axios';

export class ListCongresses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listsCong:[],
            lists:[]
        };
    }

  
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
        axios.get('https://127.0.0.1:8000/api/congresses/',config).then(
            res =>{
            const data = res.data;
            
            const list = data['hydra:member'];
            const listID =data['@id'];
            console.log(listID)
         
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
    
        const emailuser = JSON.parse(emails);
        let userId;
        return (
            <div>

                    <div><Navbar/>
                    </div>
                    <div>
                        <h1> List of Congress</h1>
                  
                            <table  className="table table-striped table-dark able-responsive-md" >  
                                <thead className="thead-dark ">
                                  <tr >
                                    <th>#</th>
                                    <th>title</th>
                                    <th>description</th>
                                    <th>date</th>
                                    <th>userId</th>
                                    <th></th>
                                    <th></th>
                                    </tr>
                                    </thead>
                            {this.state.listsCong.map(
                            
                                    item=>{
                                        return(
                                            <tbody className="table-info">

                                            <tr className="bg-light"  key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.createdAt}</td>
                                                <td>userId {userId=item.userId} </td>
                                                <td><button className="btn btn-warning">Edit</button></td>
                                                <td><button className="btn btn-danger">Remove</button></td>
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
            
        )
    }
}

export default  ListCongresses;
