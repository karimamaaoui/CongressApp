import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

import {Link} from 'react-router-dom';
import Navbar from  '../sidebarMenu/NavbarMenu';
import { Confirm } from 'react-st-modal';
import{FormControl,Form} from "react-bootstrap";
import { CSVLink } from "react-csv";

export class usersFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            searchRes:'',
            noOfElement:5,
            feedback:[]
            
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
            axios.delete(`https://127.0.0.1:8000/api/feedback/${id}`,config)
            .then(res => {
                Swal.fire({
                    title: "Warning!",
                    text: "Feedback Removed  Successfully ",
                    icon: 'warning',
                    button:"OK!"
                  });
           
                console.log(res.data);
                const feedback=this.state.feedback.filter(item =>item.id !==id);
                this.setState({
                    feedback
                });
                window.location.reload(true);
                
                 }).catch(err=>{
           
               
                console.log(err)
              })
            
        }  
      

    handlefilter = (e) => {
        this.state.search = e.target.value;
    
        if (this.state.search !== '') {
          const searchRes = this.state.feedback.filter((item) => {
            return (item.message.toLowerCase().startsWith(this.state.search.toLowerCase()) );
            
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
        axios.get('https://127.0.0.1:8000/api/feedback/',config).then(
            res =>{
            const data = res.data;
            
            const feedback = data['hydra:member'];
         
             this.setState({
                feedback:feedback
             })
             console.log("list feedback")

             console.log(this.state.feedback)
            
            },
            err=>{
                console.log(err)
                
            }

        )

    }
   
    render() {
        const emails=window.localStorage.getItem('useradmin');
        const emailuser = JSON.parse(emails);
        const slice=this.state.feedback.slice(0,this.state.noOfElement);

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
                        >List Of Feedback </h1>
                        {' '}
                        <br/>

       
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
                                <CSVLink
            style={{  padding: "8px 8px",
            verticalAlign: "middle",
            marginLeft:"10%"  ,
            }}
                data={this.state.feedback}
                filename={"feedbacks-list.csv"}
                className="btn btn-success"
                >
                Export To CSV
            </CSVLink>
    
                                </div>

                                <br/>

                        <div>
     <br/>   
                     <table style={{alignItems:"center"}} className="table table-striped table-dark able-responsive-md" >  
                                <thead className="thead-dark ">
                                  <tr >
                                    <th>#</th>
                                    <th>Stars</th>
                                    <th>Message</th>
                                    <th>UserId</th>
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
                                                <td>{item.stars}</td>
                                                <td>{item.message}</td>
                                                <td>{item.userId}</td>

                                                <td >
                                                <button className="btn btn-danger" 
                                                onClick={async () => {
                                                    const result = await Confirm('Are you sure you want to delete this one', 
                                                      'Delete Сonfirmation');
                                                    if (result) {
                                                      this.handleDelete(item.id);
                                                    } else {
                                                      this.props.history.push(`/feedbacklists`);
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
                                            <td>{item.stars}</td>
                                                <td>{item.message}</td>
                                                <td>{item.userId}</td>
                                            <td>
                                            <button className="btn btn-danger" 
                                            onClick={async () => {
                                                const result = await Confirm('Are you sure you want to delete this one', 
                                                  'Delete Сonfirmation');
                                                if (result) {
                                                  this.handleDelete(item.id);
                                                } else {
                                                  this.props.history.push(`/feedbacklists`);
                                              }}} >
                                                Remove
                                                </button>
                                                </td>
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


export default usersFeedback
