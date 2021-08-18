import { Route,BrowserRouter ,Switch} from 'react-router-dom';
import React  from 'react'
import GetStarted from './startApp/getStarted';
import Register from './account/registerForm';
import Home from './home/home';
import LoginForm from './account/formLogin';
import NoRouteFound from './startApp/noRouteFound';
import Profile from './account/userProfile';
import ListUsers from './Users/listUsers';
import AddCongresses from './congresses/addCongresses';
import Edit from './congresses/editCongresses';
import UpdateProfile from './account/updateProfile';
import ForgotPassword from './resetPassword/fogotPassword';
import ForgotEM from './resetPassword/forgotPass';
import LoginAdmin from './adminPanel/accounts/loginForm';
import RegisterAdmin from './adminPanel/accounts/registerForm';
import UsersList from './adminPanel/lists/usersList';
import CongressesList from './adminPanel/lists/congressesList';

const Routes = () => {
    
    
    return (

        <BrowserRouter>
        <div className="route">          
            <Switch>
            <Route exact path="/" component={GetStarted} />
            <Route exact  path='/register' component={Register}/>  
            <Route exact  path='/login' component={LoginForm}/>  
            <Route exact  path='/loginadmin' component={LoginAdmin}/> 
            <Route exact  path='/registeradmin' component={RegisterAdmin}/> 
            <Route exact  path='/userslist' component={UsersList}/> 
            <Route exact  path='/congresseslist' component={CongressesList}/> 


            <Route exact  path='/home' component={Home}/> 
            <Route exact  path='/profile' component={Profile}/>   
            <Route exact  path='/update/:id' component={UpdateProfile}/>   
            <Route exact  path='/add' component={AddCongresses}/>   
            <Route exact  path='/edit/:id' component={Edit}/> 
              
            <Route exact  path='/forgotPassword' component={ForgotEM}/> 
            <Route exact  path='/reset-password/:id' component={ForgotPassword}/> 

            <Route exact  path='/*' component={NoRouteFound}/>  


            </Switch>
        </div>
        </BrowserRouter>
   
  
    
        );
  };
export default Routes
