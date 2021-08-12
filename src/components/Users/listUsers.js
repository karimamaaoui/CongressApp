import React, { Component } from 'react'
import Navbar from '../home/navbarList'
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../home/home.css';
import {Card,Button} from 'react-bootstrap';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import Dialoug from './dialog'

export class listUsers extends Component {
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
        const emails=window.localStorage.getItem('users');
        const emailuser = JSON.parse(emails);
        if(!emails )
        {
            return <p>  error  you should login <button ><Link to="/login"> Login </Link></button> </p>
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
                                    <th>Role</th>
                                    <th>Created At</th>

                                    <th> Action</th>
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
                                                <td>{item.roles}</td>
                                                <td>{item.createdAt}</td>


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

<MDBCard style={{ maxWidth: '22rem' ,display: 'flex'}}>

      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/111.jpg' fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
        {this.state.lists.map(
                item=>{
                    return (
      <MDBCardBody>
        <MDBCardTitle>{item.id}</MDBCardTitle>
        <MDBCardText>
            {item.firstName} {item.lastName}
        </MDBCardText>
        <MDBBtn href='#'>Editer</MDBBtn>{'   '}
        <MDBBtn href='#'>Remove</MDBBtn>

      </MDBCardBody>
      )}
       )}
    </MDBCard>
    <div>

    </div>

            </div>
            
        )}
    }
}



export default listUsers;
