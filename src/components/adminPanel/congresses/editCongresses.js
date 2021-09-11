import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import {Form } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from  '../sidebarMenu/NavbarMenu';
import './date.css'
export class EditCongresses extends Component {
    constructor(props) {
        super(props)

        this.state = {
           // retrieve congresses id from the route
            id: this.props.match.params.id,
            title: '',
            description: '',
            createdAt: '',
            congres:[]
        }
    }


    componentDidMount(){

        
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };

      //      const createdAtStr = moment(this.state.createdAt).format('YYYY-MM-DD HH:mm:ss')

        return axios.get('https://127.0.0.1:8000/api/congres' + '/' + (this.state.id),config).then( (res) =>{
                let congresses = res.data;
                this.setState({title: congresses.title,
                    description: congresses.description,
                    createdAt :  new Date(congresses.createdAt)
                });
            });
        } 
              


        handleEdit = (e) => {
            e.preventDefault();
          
         /*   const data={
                title:this.state.title,
                description:this.state.description,
                createdAt:this.state.createdAt,
            }
          */
            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };

            let congres = {title: this.state.title, description: this.state.description, createdAt:new Date( this.state.createdAt)};
            return axios.put('https://127.0.0.1:8000/api/congres' + '/' + (this.state.id),congres,config).then( (res) =>{
             
                console.log(res.data);
                this.setState({
                   congres: res.data
                })
                console.log('congresses => ' + JSON.stringify(congres));
                this.props.history.push('/congresseslist');
                
            }) .catch(err=>{
                console.log(err)
            })
        
        }

    render() {
      
   const emails=window.localStorage.getItem('useradmin');
        const emailuser = JSON.parse(emails);

        if(!emails )
        {
            return <p>  error  you should login <button ><Link to="/loginadmin"> Login </Link></button> </p>
          
        }
        else {
       
        return (
            <div>

                    <div><Navbar/>
                    </div>
                    <div className="edit-congresses--wrapper">
                        <h1 className="editH1"> Edit  Congresses </h1>
                        <div className="add-wrapper">
                        <div className="form-group"></div>

                <form  onSubmit={this.handleEdit } style={{textAlign:"left"}} >
                <div className="form-group mb-3">

                <label className="mb-2">Title</label>
                    <input type="text" required name="title" defaultValue={this.state.title}  onChange={(e)=>this.setState({title:e.target.value})} />
               
                    <Form.Group className="mb-3" >

                    <label className="mb-2">description</label>
                    <Form.Control as="textarea" rows={3}  name="description" required defaultValue={this.state.description} onChange={(e)=>this.setState({description:e.target.value})}/>

                    </Form.Group>
                    <Form.Group className="mb-3">

                    <label className="mb-2">date</label>
                    <br/>
                    <DateTimePicker value={this.state.createdAt}  style={{display:"flex"}}
                            selected={this.state.createdAt}
                             defaultValue={new Date()}
                            name="createdAt"
                             onChange={(createdAt)=>this.setState({createdAt:createdAt})}
                            className="datepicker"
                />
                    </Form.Group>
                    
                    <br/>   
                    
                      <input type="submit" value="update" className="submit"  style={{

                    fontSize:" 1.5em",
                    marginLeft: "13em",
                    border:"0px",
                    cursor: "pointer",
                    width:"22%",
                    height:"12%",
                    textAlign:"center",
                    backgroundColor:" rgba(155,208,147, 1)"

                      }} />
                </div>
                </form>
                <p>
                    
                        
                    
                </p>
                            </div>


            </div>
          
            
            </div>
            
        )
    }}
}

export default EditCongresses
