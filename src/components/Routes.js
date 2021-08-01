import { Route,BrowserRouter ,Switch} from 'react-router-dom';
import React  from 'react'
import GetStarted from './startApp/getStarted';
import Register from './account/registerForm';
import Home from './home/home';
import LoginForm from './startApp/formlog';
import NoRouteFound from './startApp/noRouteFound';
import Profile from './account/userProfile';
import ListCongres from './congresses/listCongresses';
import AddCongresses from './congresses/addCongresses';
import Edit from './congresses/editCongresses';


const Routes = () => {
    
    
    return (

        <BrowserRouter>
        <div className="route">          
            <Switch>
            <Route exact path="/" component={GetStarted} />
            <Route exact  path='/register' component={Register}/>  
            <Route exact  path='/login' component={LoginForm}/>  
            <Route exact  path='/home' component={Home}/> 
            <Route exact  path='/profile' component={Profile}/>   
            <Route exact  path='/listCongresses' component={ListCongres}/>   
            <Route exact  path='/add' component={AddCongresses}/>   
            <Route exact  path='/edit/:id' component={Edit}/>   

            <Route exact  path='/*' component={NoRouteFound}/>  

            
            </Switch>
        </div>
        </BrowserRouter>
   
  
    
        );
  };
export default Routes
