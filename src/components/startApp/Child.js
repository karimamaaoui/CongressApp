import React, {Component} from 'react';
class Child extends Component{
     
    render(){
        return(
            <div>
                <h2>Child 2</h2>
                <h2>{this.props.email}</h2>
            </div>
        );
    }
}
export default Child;