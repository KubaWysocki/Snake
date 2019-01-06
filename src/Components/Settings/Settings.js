import React, { PureComponent } from 'react';

import './Settings.css';

import Setting from './Setting/Setting';

class Settings extends PureComponent{
    componentDidMount(){
        setTimeout( () => this.refs.flag.classList.remove('show'), 50 );
    }
    options = {
        acceleration: false,
        board: {width: 30, height: 23},
        border: false,
        speed: 160
    }
    setSize = size => this.options.board = size;
    setSpeed = speed => this.options.speed = speed;
    setBorder = border => this.options.border = border;
    setAcceleration = acceleration => this.options.acceleration = acceleration;
    render(){
        return(
            <div className='flag show' ref='flag'>
                <button 
                    className={ !this.props.showMenu ? 'Button banner center' : 'Button banner'}
                    onClick={ this.props.showMenuHandler }
                >New Game</button>
                <div className={ this.props.showMenu ? 'Settings showSettings' : 'Settings' }>
                    <Setting options={{ small: { width: 20, height: 15 },
                                        medium: { width: 30, height: 23 },
                                        large: { width: 40, height: 30 }}}
                             change={ this.setSize }
                    >PICK BOARD SIZE:</Setting>
                    <Setting options={{ border: true, 
                                        standard: false }} 
                             change={ this.setBorder }
                    >SELECT BORDER MODE:</Setting>
                    <Setting options={{ accelerating: true,
                                        constant: false }}
                             change={ this.setAcceleration }
                    >SET SPEED MODE:</Setting>
                    <Setting options={{ slow: 240,
                                        normal: 160,
                                        fast: 80 }} 
                             change={ this.setSpeed }
                    >CHOOSE SPEED:</Setting>
                </div>
                <button 
                    className={ this.props.showMenu ? 'Button startButton showSettings' : 'Button startButton' } 
                    onClick={ () => {
                        this.refs.flag.classList.add('hide');
                        this.props.start(this.options);
                    }}
                >START</button>
            </div>
        )
    }
}
export default Settings;