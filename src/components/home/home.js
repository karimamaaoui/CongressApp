import React, { Component } from 'react'
import Navbar from './navbarList'
import Footer from './Footer';
import axios from 'axios';

//const x = localStorage.getItem("users");
//const lastname = localStorage.getItem("users");

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists:[],
            currentUser :'',
        };
    }

    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
        axios.get('https://127.0.0.1:8000/api/users',config).then(
            res =>{
             //   console.log(res);
              //  console.log(lastname);
            const data = res.data;
              //console.log(data);
            //const lastname = localStorage.getItem("users");
            const list = data['hydra:member'];
            
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
        
        return (
            <div>
                    <div><Navbar/></div>
                    <div>
                        <h1>Hello home</h1>
                        
                            <table border="5">  
                                <thead>
                                  <tr>
                                    <th>Id</th>
                                    <th></th>
                                    <th>Email</th>
                                    <th></th>
                                    <th>firstName</th>
                                    <th></th>
                                    <th>lastname</th>
                                    </tr>
                                    </thead>
                            {this.state.lists.map(
                            
                                    item=>{
                                        return(
                                            <tbody>

                                            <tr  key={item.id}>
                                                <td>id : {item.id}</td>
                                                <td></td>
                                                <td>email :{item.email}</td>
                                                <td></td>
                                                <td>firstName : {item.firstName}</td>
                                                <td></td>
                                                <td>lastname: {item.lastName}</td>
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
                    <div><Footer/></div>
                
            </div>
            
        )
    }
}

export default  Home;
