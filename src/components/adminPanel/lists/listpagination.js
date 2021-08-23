import  React,{Component} from 'react';
import { DataGrid  } from '@material-ui/data-grid';
import axios from 'axios';
import { Confirm } from 'react-st-modal';
import{FormControl,Form} from "react-bootstrap";



const renderDeleteButton = (id) => {

    return (


        <strong>
            <button
                className="btn btn-danger"
                size="small"
                style={{ marginLeft: 16 }}
               onClick={async () => {
                    const result = await Confirm('Are you sure you want to deactivate this one', 
                      'Deactivate Сonfirmation ');
                    
                    if (result) {                        
                     this.handleDelete(id)
                      
                      console.log("ok")
                        
                    } else {
                        console.log("no")
          
                  }
                  }}
                >
            
                Delete
            </button>
        </strong>
    )
}

const renderUpdateButton = ()=> {
    return (
        <strong>
            <button
                className="btn btn-warning"
                size="small"
                style={{ marginLeft: 16 }}
               
            >
                Update
            </button>
        </strong>
    )   
}




const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 220,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  
  
  
  {
    field: 'roles',
    headerName: 'Roles',
    width: 250,
    editable: true,
  },

  {
    field: 'Update',
    headerName: 'Update',
    width: 150,
    renderCell:renderUpdateButton
},
{
    field: 'Delete',
    headerName: 'Delete',
    width: 150,
    renderCell:renderDeleteButton
},


{
    field: 'createdAt',
    headerName: 'CreatedAt',
    width: 200,
    editable: true,
  },
  
  {
    field: 'isVerified',
    headerName: ' Verified',
    width: 200,
    editable: true,
  },
];

/*const rows = [
    
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
*/
  class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists:[],
            search:'',
            searchRes:'',
        };
    }


    handlefilter = (e) => {
        this.state.search = e.target.value;
    
        if (this.state.search !== '') {
          const searchRes = this.state.lists.filter((item) => {
            return (item.email.toLowerCase().startsWith(this.state.search.toLowerCase())|| item.firstName.toLowerCase().startsWith(this.state.search.toLowerCase()) || item.lastName.toLowerCase().startsWith(this.state.search.toLowerCase()));
            
            // Use the toLowerCase() method to make it case-insensitive
          })
          console.log(searchRes);

          this.setState({searchRes})
        } 
      };



    handleDelete (id){
                
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
            axios.delete(`https://127.0.0.1:8000/api/users/${id}`,config)
            .then(res => {
                console.log(res.data);
                const lists=this.state.lists.filter(item =>item.id !==id);
                this.setState({
                    lists
                });
              }).catch(err=>{
           
               
                console.log(err)
              })
            
        }  
     

    
    componentDidMount()
    {
        const config={
            headers:{
                Authorization: 'Bearer ' +localStorage.getItem('token')            }
                
            };
        axios.get('https://127.0.0.1:8000/api/users/',config).then(
            res =>{
            const data = res.data;
            const list = data['hydra:member'];
            console.log(list)
            
         
             this.setState({
                 lists:list
             })
             console.log(this.state.lists)

            },
            err=>{
                console.log(err)
                
            }

        )

    }

   
 render () {    

  return (
      <div>
  <div >
                                <Form  style ={{

                                padding: "8px 8px",
                                cursor: "pointer",
                                verticalAlign: "middle",
                                marginLeft:"50%"  ,
                                width:"20%"
                                    }}>
                                <FormControl type="text" placeholder="Search "  defaultValue={this.state.search}
                                    onChange={this.handlefilter}
                                    />
                            </Form>
                                </div>
    
    {this.state.searchRes.length ===0 ?
                     
    <div style={{ height: 400, width: '100%' }}>

      <DataGrid
        rows={this.state.lists }
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick

/>    
    </div> 
        :this.state.searchRes.map((item)=> {



            const rows = [
    
                { id: item.id, lastName:item.lastName, firstName: item.firstName, email: item.email ,roles:item.roles },
              ];

                   return(
                    
                    
                    <div style={{ height: 400, width: '100%' }}>

                    <DataGrid
                    
                      rows= {rows}
                      columns={columns}
                      checkboxSelection
                      disableSelectionOnClick

              />    
                  </div> 
                 
        
                                        )
                                    
        })}   
                             {console.log(this.state.searchRes.length)} 

    </div>

  );
}
}

export default DataTable