import React, { Component ,useState } from 'react'
import axios from 'axios'

export default function DataBase() 
    {
        const [lists,setLists]=useState([]);

            const config={
                headers:{
                    Authorization: 'Bearer ' +localStorage.getItem('token')            }
                    
                };
            axios.get('https://127.0.0.1:8000/api/users/',config).then(
                res =>{
                const data = res.data;
                const list = data['hydra:member'];
                
                console.log(list);
                setLists(list);
                console.log("dddd",lists)
                },
                err=>{
                    console.log(err)
                    
                }
    
            )
    
        
         return (
             <div>
                 </div>
         )
    }    


