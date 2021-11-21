import{ Navbar ,Nav} from "react-bootstrap";
import './home.css';
import {Redirect} from 'react-router-dom';
import React, { Component } from 'react'
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
              <div>
                <header>                        
                    <Navbar  className="navbar" >
                            <Navbar.Brand className="navTitle" >
                                Welcome
                            </Navbar.Brand>
                            <Nav  >
                            <Nav.Link href="/profile">Profile</Nav.Link >  
                            <Nav.Link href="#footer"  onClick={window.scrollTo(0,1200)}>About Us</Nav.Link >
                            <Nav.Link  href="/home" >Congresses</Nav.Link >
                            <Nav.Link  href="/book" >Booking</Nav.Link >
                            <Nav.Link  href="/feedback" >Feedback</Nav.Link >
    
                            </Nav>
                            <Nav>
                            <Nav.Link href="/"  className="navbar__item" onClick={this.signOut}>Logout</Nav.Link >

                            </Nav>
                        </Navbar>
                 
    
    
    
                        </header>
                        
                        </div>
    
     
                </div>
                
                
        )
    }
}

export default NavbarList

