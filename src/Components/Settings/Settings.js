import React, { PureComponent } from 'react';

import './Settings.css';

import Setting from './Setting/Setting';

class Settings extends PureComponent{
    state = {
        ...this.props.gameState
    }
    componentDidMount(){
        setTimeout( () => this.refs.flag.classList.remove('show'), 50 );
    }
    setSize = board => this.setState({ board });
    setSpeed = speed => this.setState({ speed });
    setBorder = border => this.setState({ border });
    setAcceleration = acceleration => this.setState({ acceleration });
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
                                        large: { width: 40, height: 30 } }}
                             checkedValue={ this.state.board }
                             change={ this.setSize }
                    >PICK BOARD SIZE:</Setting>
                    <Setting options={{ border: true, 
                                        standard: false }} 
                             checkedValue={ this.state.border }
                             change={ this.setBorder }
                    >SELECT BORDER MODE:</Setting>
                    <Setting options={{ accelerating: true,
                                        constant: false }}
                             checkedValue={ this.state.acceleration }
                             change={ this.setAcceleration }
                    >SET SPEED MODE:</Setting>
                    <Setting options={{ slow: 240,
                                        normal: 160,
                                        fast: 80 }} 
                             checkedValue={ this.state.speed }
                             change={ this.setSpeed }
                    >CHOOSE SPEED:</Setting>
                    <button 
                        className='Button startButton'
                        onClick={ () => {
                            this.refs.flag.classList.add('hide');
                            this.props.start( this.state );
                        }}
                    >START</button>
                </div>
            </div>
        )
    }
}
export default Settings;