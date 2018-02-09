import React, { Component } from 'react';
import "./photo.css";

export default class Photo extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps: ", nextProps);
    }
    render() {
        let mouse = this.props.mouse || {};
        return (
            <div className="photo">
                <img className="photo" src="./img/img1.jpg" />
                {mouse.x},{mouse.y}
            </div>
        );
    }
}