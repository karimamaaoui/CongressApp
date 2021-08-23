import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {SidebarData} from './SidebarData';
import './sidebar.css';
import {IconContext} from 'react-icons';
import * as Vsc from "react-icons/vsc"
import * as Io from "react-icons/io"
import axios from 'axios';

function NavbarMenu() {
        
    const [sidebar,setSidebar]=useState(false);
    const [islogout,setIsLogout]=useState(false);
    const showSidebar =()=>setSidebar(!sidebar);

   const signOut = () => {
        localStorage.removeItem("useradmin");
        axios.get('https://127.0.0.1:8000/logout/').then(

            setIsLogout(!islogout)

        )
        console.log("logout")

      };
    
    return (
        <div>
            <IconContext.Provider value={{color:'#fff'}}>             
            <div className='sidebar'>

                 <Link to="#" className='menu-bars' >
                    <FaIcons.FaBars onClick={showSidebar}/>

                </Link>

                <div className="account" >
                    <Link to="/adminprofile" >
                      <Vsc.VscAccount/>

                      </Link>

                      </div>
                      
                <span>
                    {' '}
                </span>
                      <div className="mail">
                      <AiIcons.AiOutlineMail/>

                      </div>

                <span>
                    {' '}
                </span>
                <Link  to="/loginadmin">
                <div className="logout"  onClick={signOut}>
                    <Io.IoIosLogOut /></div>
                    </Link>
            </div>

            <nav className={sidebar ?'nav-menu active': 'nav-menu'} >
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars' >
                    <AiIcons.AiOutlineClose />
                </Link>

                    </li>
                    {SidebarData.map((item,index)=>{
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })
                    
                    }
                </ul>

            </nav>
            </IconContext.Provider>
        </div>
    )
}

export default NavbarMenu
