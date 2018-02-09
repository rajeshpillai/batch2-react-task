import React, { Component } from 'react';
import './colorpicker.css';

export default class ColorPicker extends Component {
    colors = ["#E0E0E0","yellow","skyblue","green","pink","orange"];

    onColorPick = (e, color) => {
        if (this.props.onColorPick) this.props.onColorPick(e, color);
    }
    render() {
        var colorUI = this.colors.map((color) => {
            return (
                <span 
                    onClick={(e)=>{this.onColorPick(e, color)}}
                    style={{backgroundColor: color}} 
                    className="color">
                </span>
            )
        })
        return (
            <div className="color-palette">
                {colorUI}
            </div>
        );
    }
}
