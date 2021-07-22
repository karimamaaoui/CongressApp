

import React, { Component } from 'react'

export class Container extends Component {

    componentDidMount()
    {
        console.log(this.props.match.parms);
    }

    render() {
        return (
            <div>
                hello from contrainer
            </div>
        )
    }
}

export default Container
