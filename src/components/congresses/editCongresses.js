import React, { Component } from 'react'
import axios from 'axios';
import Navbar from '../home/navbarList';
import { Link } from "react-router-dom";
import {Form } from 'react-bootstrap'
import '../account/form.css';



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
        return axios.get('https://127.0.0.1:8000/api/congres' + '/' + (this.state.id),config).then( (res) =>{
                let congresses = res.data;
                this.setState({title: congresses.title,
                    description: congresses.description,
                    createdAt : congresses.createdAt
                });
            });
        }            

        handleChange(event)
        {
          this.setState({[event.target.name]:event.target.value})
          
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

            let congres = {title: this.state.title, description: this.state.description, createdAt: this.state.createdAt};
                
            return axios.put('https://127.0.0.1:8000/api/congres' + '/' + (this.state.id),congres,config).then( (res) =>{
             
                console.log(res.data);
                this.setState({
                   congres: res.data
                })
                console.log('congresses => ' + JSON.stringify(congres));
                this.props.history.push('/home');


                
            }) .catch(err=>{
                console.log(err)
            })
        
        }


    render() {
        const emails=window.localStorage.getItem('users');
        const emailuser = JSON.parse(emails);
      // const redirectToUrl = <Redirect to="/login" />;
        if(!emails )
        {
            return <p>  error  you should login <button ><Link to="/login"> Login </Link></button> </p>
            //<NoRouteFound/>
            //  {redirectToUrl}
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

                <form  onSubmit={this.handleEdit } >
                <div className="form-group mb-3">

                <label className="mb-2">Title</label>
                    <input type="text" required name="title" defaultValue={this.state.title}  onChange={(e)=>this.setState({title:e.target.value})} />
               
                    <Form.Group className="mb-3" >

                    <label className="mb-2">description</label>
                    <Form.Control as="textarea" rows={3} name="description" required defaultValue={this.state.description} onChange={(e)=>this.setState({description:e.target.value})}/>

                    </Form.Group>
                    <label className="mb-2">date</label>
                    <input type="datetime-local" name="createdAt" required defaultValue={this.state.createdAt}  onChange={(e)=>this.setState({createdAt:e.target.value})}/>
                     <button type="submit"   id="editbtn" className="btn btn-primary" >Update </button>
                </div>
                </form>



                            </div>

            </div></div>
            
        )
    }}
}

export default EditCongresses
