import React, {Component} from 'react';
import account from '../assets/account.png';
import './userProfile.css';
import axios from 'axios';
import Navbar from '../home/navbarList';


class UpdateProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lists:[],
            firstName:'',
            lastName:'',
            email:''
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
            const data = res.data;
            const list = data['hydra:member'];
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
 
    render(){
        let userID;
        const emails=window.localStorage.getItem('users');

        const emailuser = JSON.parse(emails);
        return(
            <div>
         <div><Navbar/> </div>
        {this.state.lists.map(
                            
            item=>{

                if (item.email===emailuser.email)
        return(
            <div >
                
                 
              <div >
                    <input type="submit" value="edit" className="submit" />
                 </div>
              </div>

            

            
            
            
        );
        
    }
    
    )
    
        }
        
        </div>
        
        )
    }
    }
export default UpdateProfile;