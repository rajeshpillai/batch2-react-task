import React, { Component } from 'react';
import ReactDOM from "react-dom";

export default class Mouse extends Component {
    state = {x: 0, y: 0}

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render (){
        return (
            <div {...this.props} onMouseMove={this.handleMouseMove}>
                {/* {this.props.children(this.state)} */}
                {this.props.render(this.state)}
            </div>
        )
    }
    
}
