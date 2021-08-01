import React, { Component } from 'react'
import Navbar from '../home/navbarList'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Card,Button} from 'react-bootstrap'
//const x = localStorage.getItem("users");
//const lastname = localStorage.getItem("users");
let idUser ;
export class ListCongresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists:[],
            currentUserId :'',
        };
    }

    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
        axios.get('https://127.0.0.1:8000/api/users/',config).then(
            res =>{
             //   console.log(res);
              //  console.log(lastname);
            const data = res.data;
              //console.log(data);
            //const lastname = localStorage.getItem("users");
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
        //names=JSON.parse(localStorage.getItem("users"));
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

                    <div><Navbar/>
                    {emailuser.email}
                    </div>
                    <div>
                        <h1> List </h1>
                            
                            <table  className="table table-striped table-dark able-responsive-md" >  
                                <thead className="thead-dark ">
                                  <tr >
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>firstName</th>
                                    <th>lastname</th>
                                    <th></th>
                                    <th></th>
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
                                                <td> idUser {idUser=item.id}</td>

                                                <td><button className="btn btn-warning">Edit</button></td>
                                                <td><button className="btn btn-danger">Remove</button></td>

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

                    <Card>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
            </div>
            
        )}
    }
}

export default  ListCongresses;
