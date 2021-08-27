import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from  '../sidebarMenu/NavbarMenu';
import { Confirm } from 'react-st-modal';
import './main.css'
import ReadMoreReact from 'read-more-react';

import{FormControl,Form} from "react-bootstrap";



export class CongressesList extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            listsCong:[],
            lists:[],
            congresid:'',
            search:'',
            searchRes:'',
            noOfElement:5,
            salle_id:''
            
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
            axios.delete(`https://127.0.0.1:8000/api/congres/${id}`,config)
            .then(res => {
                console.log(res.data);
                const lists=this.state.lists.filter(item =>item.id !==id);
                this.setState({
                    lists
                });
                window.location.reload(true);
                
                 }).catch(err=>{
           
               
                console.log(err)
              })
            
        }  
      handleSearch=()=>
      {
        
        console.log("eee",this.state.listsCong)
        const newlist = this.state.listsCong.filter((item)=>{
            if(this.state.search == null)
            
                return item
            else if(item.title.toLowerCase().includes(this.state.search.toLowerCase()) || item.description.toLowerCase().includes(this.state.search.toLowerCase())){
                { console.log("new mlist",newlist)}
                { console.log(item)}

                return item
            }
          })
     }


      handlefilter = (e) => {
        this.state.search = e.target.value;
    
        if (this.state.search !== '') {
          const searchRes = this.state.listsCong.filter((item) => {
            return (item.title.toLowerCase().startsWith(this.state.search.toLowerCase()) || item.description.toLowerCase().startsWith(this.state.search.toLowerCase()));
            
            // Use the toLowerCase() method to make it case-insensitive
          })
          console.log(searchRes);

          this.setState({searchRes})
        } 
      };
    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
        axios.get('https://127.0.0.1:8000/api/congres/',config).then(
            res =>{
            const data = res.data;
            
            const list = data['hydra:member'];
         
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
    loadMore =()=>{
        this.setState({
            noOfElement : this.state.noOfElement+this.state.noOfElement
        })
    }


    render() {

        const emails=window.localStorage.getItem('useradmin');
        const emailuser = JSON.parse(emails);
        const slice=this.state.listsCong.slice(0,this.state.noOfElement);

        if(!emails )
        {
            return <h1>  error  you should login <button ><Link to="/loginadmin"> Login </Link></button> </h1>
        }
        else {
        return (
            <div>   
                           
                    <Navbar />

                    <div>
                        <h1 
                        >List Of Congresees </h1>
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
                                <FormControl type="text" placeholder="Search "  defaultValue={this.state.search}
                                    onChange={this.handlefilter}
                                    />
                            </Form>
                            { '  '}
                            <Link to ="/add">
    
    <button className="btn btn-primary" style={{  padding: "8px 8px",
                                cursor: "pointer",
                                verticalAlign: "middle",
                                marginLeft:"60%"  ,
                                width:"100%"
                                }}  >Add  new congresses</button>
    <br/>

    </Link>
    
                                </div>
       
                                <br/>
                                <div>
     <br/>   

    <table className="table table-striped table-dark able-responsive-md" >  
                                <thead className="thead-dark ">
                                  <tr >
                                    <th>#</th>
                                    <th>title</th>
                                    <th>description</th>
                                    <th>Created At</th>
                                    <th>salle</th>
                                    <th>Action</th>
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
                                                <td>{item.title}</td>
                                                <td>
                                                <ReadMoreReact text={item.description}
                                                    min={5}
                                                    ideal={50}
                                                    max={100}
                                                    readMoreText="click here to read more"/>
                                                </td>
                                                <td>{item.createdAt}</td>
                                                <td>{item.salle}</td>
                                                <td rowSpan="2">
                                                    <button className="btn btn-warning"
                                                     onClick={ () => this.handleUpdate(item.id)}>
                                                         Edit
                                                         </button>
                                                <button className="btn btn-danger" 
                                                onClick={async () => {
                                                    const result = await Confirm('Are you sure you want to delete this one', 
                                                      'Delete Сonfirmation');
                                                    if (result) {
                                                      this.handleDelete(item.id);
                                                    } else {
                                                      this.props.history.push(`/congresseslist`);
                                                  }}} >
                                                    Remove
                                                    </button>
                                                    </td>

                                            </tr>
                                            </tbody>
                                            

                                        )

                                    }
                                )
                            :
                            this.state.searchRes.map((item)=> {
                                return(
                                            
                                    <tbody className="table-info">

                                    <tr className="bg-light"  key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.salle}</td>

                                        <td><button className="btn btn-warning" onClick={ () => this.handleUpdate(item.id)}>Edit</button>
                                        <button className="btn btn-danger"
                                        
                                        onClick={async () => {
                                            const result = await Confirm('Are you sure you want to delete this one', 
                                              'Delete Сonfirmation ');
                                            
                                            if (result) {
                                              this.handleDelete(item.id);
                                         
                                            
                                            } else {
                                              this.props.history.push(`/congresseslist`);
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

    <button className="btn btn-dark d-block w-30 "style={{textAlign:"center" , marginLeft:"45%", marginBottom:'2%'}} onClick ={()=> this.loadMore() }  >
         Load More
     </button>
            </div>
            
        )}
    }
}



export default CongressesList;
