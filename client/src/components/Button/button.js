import React, { Component } from 'react';
import './button.css';

export default class Button extends Component {

    render () {
        return(
            <button type="submit" className={this.props.styles} onClick={this.props.click}>
                {this.props.name}
            </button>
        )
        
    }
}