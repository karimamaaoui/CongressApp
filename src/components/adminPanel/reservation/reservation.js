import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from  '../sidebarMenu/NavbarMenu';
import { Confirm } from 'react-st-modal';
import{FormControl,Form} from "react-bootstrap";
import Swal from 'sweetalert2'

export class reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId :'',
            lists:[],
            search:'',
            searchRes:'',
            noOfElement:5,
            bookings:[]

        };
    }
 
        loadMore =()=>{
            this.setState({
                noOfElement : this.state.noOfElement+this.state.noOfElement
            })
        }
          
    
    
        
        handleDelete (id){
                
                const config={
                    headers:{
                        Authorization: 'Bearer ' +localStorage.getItem('token')            }
                        
                    };
                    console.log(this.state.bookings)
                    axios.delete(`https://127.0.0.1:8000/api/bookings/${id}`,config)
                    .then(res => {
                        Swal.fire({
                            title: "Warning!",
                            text: "Congresses Removed  Successfully ",
                            icon: 'warning',
                            button:"OK!"
                          });
                   
                       
                  
                    console.log(res.data);
                    const bookings=this.state.bookings.filter(item =>item.id !==id);
                    this.setState({
                        bookings
                    });
                    window.location.reload(true);

                  }).catch(err=>{
               

                   
                    console.log(err)
                  })
                
            }  
            handlefilter = (e) => {
                this.state.search = e.target.value;
            
                if (this.state.search !== '') {

                  const searchRes = this.state.bookings.filter((item) => {
                    return (item.createdAt.toLowerCase().startsWith(this.state.search.toLowerCase()));
                    
                    // Use the toLowerCase() method to make it case-insensitive
                  })
                  console.log("search res" ,searchRes);
        
                  this.setState({searchRes})
                } 
              };
                 
    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };

            axios.get(`https://127.0.0.1:8000/api/bookings`,config)
            .then(res => {
                console.log(res.data);
                const bookings = res.data['hydra:member'];
                console.log(bookings)
             //   const bookings=res.data;
                this.setState({
                    bookings
                });
              }).catch(err=>{
           
               
                console.log(err)
              })
            
       
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
        const slice=this.state.bookings.slice(0,this.state.noOfElement);

        const emails=window.localStorage.getItem('useradmin');
        const emailuser = JSON.parse(emails);
        if(!emails )
        {
            return <h1>  error  you should login <button ><Link to="/loginadmin"> Login </Link></button> </h1>
        }
        else {
        return (
            <div>              
                    <Navbar />

                    <div>

                        <h1> List Of Bookings</h1>
                        {' '}
                        <br/>

                        <div style={{display:"flex"}} >

                                <Form  style ={{

                                padding: "8px 8px",
                                cursor: "pointer",
                                verticalAlign: "middle",
                                marginLeft:"30%"  ,
                                width:"20%"
                                    }}>
                                <FormControl type="text" placeholder="Search"  defaultValue={this.state.search}
                                    onChange={this.handlefilter}
                                    />
                            </Form>
                            { '  '}
    
                                </div>
       
                                <br/>

                            
                            <table style={{alignItems:"center"}} className="table table-striped table-dark able-responsive-md" >  
                                <thead className="thead-dark ">
                                  <tr >
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Congresses</th>
                                    <th>Created At</th>
                                    <th></th>
                                    </tr>
                                    </thead>
                                    {this.state.searchRes.length ===0 ?

                            slice.map(
                            
                                    (item,index)=>{
                                        return(
                                            
                                            <tbody className="table-info">

                                            <tr className="bg-light"  key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.user}</td>
                                            <td>{item.congres}</td>
                                            <td>{item.createdAt}</td>
                               <td>             <button className="btn btn-danger"
                                                
                                                onClick={async () => {
                                                    const result = await Confirm('Are you sure you want to delete this one', 
                                                      'Delete Сonfirmation ');
                                                    
                                                    if (result) {
                                                      this.handleDelete(item.id);
                                                      this.props.history.push(`/bookingslist`);
                                                            
                                                    } else {
                                                      this.props.history.push(`/bookingslist`);
                                          
                                                  }
                                                  }}
                                                
                                                >
                                                    
                                                    
                                                    Remove
                                                    
                                                    </button></td>

                                            </tr>
                                            </tbody>
                                            

                                        )

                                    }
                                ): this.state.searchRes.map((item)=> {
                                    return (
                                        <tbody className="table-info">

                                            <tr className="bg-light"  key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.user}</td>
                                            <td>{item.congres}</td>
                                            <td>{item.createdAt}</td>
                               <td><button className="btn btn-warning" onClick={ () => this.handleUpdate(item.id)}>Edit</button>
                                                {' '}
                                                <button className="btn btn-danger"
                                                
                                                onClick={async () => {
                                                    const result = await Confirm('Are you sure you want to delete this one', 
                                                      'Delete Сonfirmation ');
                                                    
                                                    if (result) {
                                                      this.handleDelete(item.id);
                                                      this.props.history.push(`/bookingslist`);
                                                            
                                                    } else {
                                                      this.props.history.push(`/bookingslist`);
                                          
                                                  }
                                                  }}
                                                
                                                >
                                                    
                                                    
                                                    Remove
                                                    
                                                    </button></td>

                                            </tr>
                                       </tbody>
                                            
                                        
                                    )
                                })


                            }
                            </table>
                  

            
                      </div>

                      <button className="btn btn-dark d-block w-30 "style={{textAlign:"center" , marginLeft:"45%", marginBottom:'2%'}} onClick ={()=> this.loadMore() }  >
         Load More
     </button>

            
             </div>
            
        )}
    }
}


export default reservation
