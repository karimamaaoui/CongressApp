import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc"
import * as GiIcons from "react-icons/gi" 
import * as CgIcons from "react-icons/cg" 


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
        icon:<AiIcons.AiOutlineUsergroupAdd/>,
        cName: 'nav-text'
    },

    
    {
        title:'Congresses',
        path:'/congresseslist',
        icon:<GiIcons.GiCongress/>,
        cName: 'nav-text'
    },

    {
        title:'Salles',
        path:'/sallelists',
        icon:<GiIcons.GiDoor/>,
        cName: 'nav-text'
    },
    {
        title:'Reservations',
        path:'/bookingslist',
        icon:<AiIcons.AiOutlineIdcard/>,
        cName: 'nav-text'
    },

    
    {
        title:'Feedback',
        path:'/feedbacklists',
        icon:<AiIcons.AiOutlineMail/>,
        cName: 'nav-text'
    },
    
    {
        title:'Profile',
        path:'/adminprofile',
        icon:<CgIcons.CgProfile/>,
        cName: 'nav-text'
    },
]
