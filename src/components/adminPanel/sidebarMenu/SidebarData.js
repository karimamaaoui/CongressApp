import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

 

export const SidebarData =[

    {
        title:'Home',
        path:'/userslist',
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },

    
    {
        title:'Users',
        path:'/userslist',
        icon:<AiIcons.AiFillProject/>,
        cName: 'nav-text'
    },

    
    {
        title:'Congresses',
        path:'/congresseslist',
        icon:<AiIcons.AiFillSchedule/>,
        cName: 'nav-text'
    },

    {
        title:'Salles',
        path:'/sallelists',
        icon:<AiIcons.AiFillSchedule/>,
        cName: 'nav-text'
    },
    
    {
        title:'Profile',
        path:'/adminprofile',
        icon:<AiIcons.AiFillProfile/>,
        cName: 'nav-text'
    },
]
