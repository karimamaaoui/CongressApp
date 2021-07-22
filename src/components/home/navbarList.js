//import React from 'react';
import{FormControl, Navbar ,Nav,Form, Button} from "react-bootstrap";
import './home.css';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react'
//import { Alert } from "bootstrap";

class NavbarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          islogout: false
        };
      }
      signOut = () => {
        localStorage.removeItem("users");
        this.setState({
          islogout: true
        });
      };
    
    render() {
        if (this.state.islogout) {
            return <Redirect to="/" />;
          }
        return(
            <div >
                <header>                        
                    <Navbar variant="dark" className="navbar" >
                            <Navbar.Brand className="navTitle" >
                                Welcome
                            </Navbar.Brand>
                            <Nav  >
    
                            <Nav.Link href="#footer">About Us</Nav.Link >
                            <Nav.Link  href="/" >Congres</Nav.Link >
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

