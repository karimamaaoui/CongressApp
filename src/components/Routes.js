import { Route,BrowserRouter ,Switch} from 'react-router-dom';
import React  from 'react'
import GetStarted from './startApp/getStarted';
import Register from './account/registerForm';
import Home from './home/home';
import LoginForm from './account/formLogin';
import NoRouteFound from './startApp/noRouteFound';
import Profile from './account/userProfile';
import AddCongresses from './adminPanel/congresses/addCongresses';
import Edit from './adminPanel/congresses/editCongresses';
import UpdateProfile from './account/updateProfile';
import ForgotPassword from './resetPassword/fogotPassword';
import ForgotEM from './resetPassword/forgotPass';
import RegisterAdmin from './adminPanel/accounts/registerForm';
import UsersList from './adminPanel/users/usersList';
import CongressesList from './adminPanel/lists/congressesList';
import AdminProfile from './adminPanel/profile/adminProfile'
import EditAdmin from './adminPanel/profile//updateProfile'
import SignIn from './adminPanel/accounts/signIn'
import ForgotPasswordAdmin from './adminPanel/forgotPassword/fogotPasswordAdmin'
import ForgotEMAdmin from './adminPanel/forgotPassword/forgotPassAdmin';
import UpdateUser from './adminPanel/users/updateUser'
import AddUser from './adminPanel/users/addUser'
import AddSalle from './adminPanel/Salles/addSalle'
import ListSalle from './adminPanel/Salles/salleList'
import EditSalle from './adminPanel/Salles/editSalle'


const Routes = () => {
    
    
    return (

        <BrowserRouter>
        <div className="route">          
            
            <Switch>
            <Route exact path="/addsalle" component={AddSalle} />
            <Route exact path="/sallelists" component={ListSalle} />
            <Route exact path="/editsalle/:id" component={EditSalle} />


            <Route exact path="/" component={GetStarted} />
            <Route exact  path='/register' component={Register} />  
            <Route exact  path='/login' component={LoginForm} />  
            <Route exact  path='/loginadmin' component={SignIn} /> 
            <Route exact  path='/registeradmin' component={RegisterAdmin} /> 
            
            <Route exact  path='/userslist' component={UsersList} /> 
            <Route exact  path='/adduser' component={AddUser} /> 

            <Route exact  path='/updateuser/:id' component={UpdateUser} /> 
            <Route exact  path='/congresseslist' component={CongressesList} /> 

            
            <Route exact  path='/home' component={Home} /> 

            <Route exact  path='/profile' component={Profile} />   
            <Route exact  path='/adminprofile' component={AdminProfile} />   
            <Route exact  path='/update/:id' component={UpdateProfile} />   
            <Route exact  path='/updateadmin/:id' component={EditAdmin} />   

            <Route exact  path='/add' component={AddCongresses}/>   
            <Route exact  path='/edit/:id' component={Edit}/> 
              
            <Route exact  path='/forgotPassword' component={ForgotEM}/> 
            <Route exact  path='/reset-password/:id' component={ForgotPassword}/> 

            <Route exact  path='/forgotPasswordAdmin' component={ForgotEMAdmin}/> 
            <Route exact  path='/reset-password-admin/:id' component={ForgotPasswordAdmin}/> 

            <Route exact  path='/*' component={NoRouteFound}/>  
            </Switch>
        </div>
        </BrowserRouter>
   
  
    
        );
  };
export default Routes
