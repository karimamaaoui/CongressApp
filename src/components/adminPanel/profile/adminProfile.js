import React, {Component} from 'react';
import './adminProfile.css';
import axios from 'axios';
import account from './../../assets/account.png'
import Navbar from  '../sidebarMenu/NavbarMenu';


class AdminProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            lists:[],
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
    handleUpdate(id)
    {
        this.props.history.push(`/updateadmin/${id}`);

    }

 
    render(){
        let adminId;
        const emails=window.localStorage.getItem('useradmin');
        const emailadmin = JSON.parse(emails);
        return(
            
            <div>
                <div>
                <Navbar />

                </div>
        {this.state.lists.map(
                            
            item=>{

                if (item.email===emailadmin.email)
        return(
            <div >
                <p  key={item.id}>
                <div className="wrapper">
                    <div className="left">
                    <h2>Account</h2>

                        <img src={account} alt="user" width="100" />
                        <h4>Name</h4>
                        <p> {item.firstName} </p>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Information</h3>
                            <div className="info_data">
                 <div className="data">
                   <h4>LastName</h4>
                    <p> {item.lastName}</p>
              </div>
              <div className="data">
                    <h4>Email</h4>
                    <p>{item.email}</p>
                    <p hidden>
                        {adminId=item.id}
                    
                    </p>
                    {localStorage.setItem('adminId',adminId)}

                 </div>
                 
                 <div className="data">
                   <h4>Roles</h4>
                    <p> {item.roles}</p>
              </div>
             
             
             
              <div >

                    <input type="submit" value="edit" className="submit"  onClick={ () => this.handleUpdate(item.id)}/>
                 </div>
              </div>
                        </div>
                    </div>

                </div>
    
            </p>
            
            </div>
        );
        
    }
    
    )
    
        }
        
        </div>
        
        )
    }
    }
export default AdminProfile;