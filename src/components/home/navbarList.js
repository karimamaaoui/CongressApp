//import React from 'react';
import{FormControl, Navbar ,Nav,Form, Button} from "react-bootstrap";
import './home.css';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react'
//import { Alert } from "bootstrap";
import axios from 'axios';

class NavbarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          islogout: false
        };
      }
      signOut = () => {
        localStorage.removeItem("users");
        axios.get('https://127.0.0.1:8000/logout/').then(
        this.setState({
          islogout: true
        })

        )
        console.log("logout")

      };
    
    render() {
        if (this.state.islogout) {

            return <Redirect to="/" />;
          }
        return(
            <div >
                <header>                        
                    <Navbar  className="navbar" >
                            <Navbar.Brand className="navTitle" >
                                Welcome
                            </Navbar.Brand>
                            <Nav  >
                            <Nav.Link href="/profile">Profile</Nav.Link >    
                            <Nav.Link href="#footer">About Us</Nav.Link >
                            <Nav.Link  href="/home" >Congresses</Nav.Link >
                            <Nav.Link href="/" onClick={this.signOut}>Logout</Nav.Link >
    
                            </Nav>
                            <Form  className="navbar__item">
                                <FormControl type="text" placeholder="Search "  />
                            </Form>
                            <Button className="navbar__item2" >Search</Button>
    
                        </Navbar>
                 
    
    
    
                        </header>
    
    
    
                    
     
                </div>
                
        )
    }
}

export default NavbarList

