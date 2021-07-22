import { Route,BrowserRouter ,Switch} from 'react-router-dom';
//import NavbarList from './navbarList';
import React  from 'react'
import GetStarted from './startApp/getStarted';
//import Login from './account/LoginForm'
import Register from './account/registerForm';
import Home from './home/home';
import LoginForm from './startApp/formlog';
//import ProtectedRoute from './startApp/ProtectedRoute';
import NoRouteFound from './startApp/noRouteFound';
//import NotFoundRoute from './startApp/noRouteFound';

const Routes = () => {
    
    
    return (

        <BrowserRouter>
        <div className="route">          
            <Switch>
            <Route exact path="/" component={GetStarted} />
            <Route exact  path='/register' component={Register}/>  
            <Route exact  path='/login' component={LoginForm}/>  
            <Route exact  path='/home' component={Home}/>  
            <Route exact  path='/*' component={NoRouteFound}/>  

            
            </Switch>
        </div>
        </BrowserRouter>
   
  
    
        );
  };
export default Routes
