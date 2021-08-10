import React, { Component } from 'react'
import './noRoute.css';
export class NoRouteFound extends Component {
    render() {
        return (
            <div className="noRoute">
                <h1 className="h1route" >4<span></span>4</h1>
                <h2 > THIS PAGE DOES NOT EXIST</h2>
            </div>
        )
    }
}

export default NoRouteFound
