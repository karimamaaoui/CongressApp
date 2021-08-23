import React, {Component} from 'react';
import axios from 'axios';
import Navbar from  '../sidebarMenu/NavbarMenu';
import {Form } from 'react-bootstrap'


class UpdateAdminProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            lists:[],
            firstName:'',
            lastName:'',
            email:'',
            roles:'',
            users:[]
        };
    }

    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
    

        return axios.get('https://127.0.0.1:8000/api/users' + '/' + (this.state.id),config).then( (res) =>{
            let users = res.data;
            this.setState({firstName: users.firstName,
                lastName: users.lastName,
                email : users.email,
                roles:users.roles
            });
        });
  

    }

        handleEdit = (e) => {
            e.preventDefault();
          
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };

            let users = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email,roles:this.state.roles};
                
            return axios.put('https://127.0.0.1:8000/api/users' + '/' + (this.state.id),users,config).then( (res) =>{
             
                console.log(res.data);
                this.setState({
                   users: res.data
                })
                console.log('useradmin => ' + JSON.stringify(users));
                this.props.history.push('/adminprofile');


                
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
                        <h1 className="editH1"> Edit User Account </h1>
                        <div className="add-wrapper">
                        <div className="form-group"></div>
                
                 
              <div >
              <form  onSubmit={this.handleEdit } style={{textAlign:"left"}} >
                <div className="form-group mb-3">
                <Form.Group className="mb-3" >

                <label className="mb-2">firstName</label>
                    <input type="text" required name="firstName" defaultValue={this.state.firstName}  onChange={(e)=>this.setState({firstName:e.target.value})} />
               </Form.Group>
               <Form.Group className="mb-3" >

                    <label className="mb-2">lastName</label>
                    <input type ="textarea"  name="lastName" required defaultValue={this.state.lastName} onChange={(e)=>this.setState({lastName:e.target.value})}/>
               </Form.Group>
                    <Form.Group className="mb-3" >

                    <label className="mb-2">email</label>
                    <input type="email" name="email" required defaultValue={this.state.email}  onChange={(e)=>this.setState({email:e.target.value})}/>
                 </Form.Group>
                 <Form.Group className="mb-3" >
                    <label className="mb-2">Roles</label>

                    <input type="text" required name="roles" defaultValue={this.state.roles}  onChange={(e)=>this.setState({roles:e.target.value})} />
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
export default UpdateAdminProfile;