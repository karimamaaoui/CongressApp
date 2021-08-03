import React, {Component} from 'react';
import account from '../assets/account.png';
import './userProfile.css';
import axios from 'axios';
import Navbar from '../home/navbarList';


class UpdateProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            lists:[],
            firstName:'',
            lastName:'',
            email:'',
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
                email : users.email
            });
        });
  

    }

        handleEdit = (e) => {
            e.preventDefault();
          
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };

            let users = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email};
                
            return axios.put('https://127.0.0.1:8000/api/users' + '/' + (this.state.id),users,config).then( (res) =>{
             
                console.log(res.data);
                this.setState({
                   users: res.data
                })
                console.log('users => ' + JSON.stringify(users));
                this.props.history.push('/profile');


                
            }) .catch(err=>{
                console.log(err)
            })
        
        }

 
    render(){
        const emails=window.localStorage.getItem('users');

      //  const emailuser = JSON.parse(emails);
        return(
            <div>
         <div><Navbar/> </div>
                            


            <div >
                
                 
              <div >
              <form  onSubmit={this.handleEdit } >
                <div className="form-group mb-3">

                <label className="mb-2">firstName</label>
                    <input type="text" required name="firstName" defaultValue={this.state.firstName}  onChange={(e)=>this.setState({firstName:e.target.value})} />
               

                    <label className="mb-2">lastName</label>
                    <input type ="textarea"  name="lastName" required defaultValue={this.state.lastName} onChange={(e)=>this.setState({lastName:e.target.value})}/>

                    <label className="mb-2">email</label>
                    <input type="email" name="email" required defaultValue={this.state.email}  onChange={(e)=>this.setState({email:e.target.value})}/>
                     <button type="submit"   id="editbtn" className="btn btn-primary" >Update </button>
                </div>
                </form>

                    <input type="submit" value="edit" className="submit" />
                 </div>
              </div>

            

            
            
            
    
        
    
    
    
        
        
        </div>
        
        )
    }
    }
export default UpdateProfile;