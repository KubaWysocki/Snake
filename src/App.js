import React, { Component } from 'react';

import './App.css';
import snake from './snake.png';

import Settings from './Components/Settings/Settings';
import Board from './Components/Board/Board';

class App extends Component {
  state = {
    start: false,
    showMenu: false
  }
  gameState = {}
  startGame = ( gameState ) => {
    this.gameState = gameState;
    this.refs.LogoImage.classList.add('dock');
    setTimeout( () => this.setState({ start: true }), 300 );
  }
  stopGame = () => {
    this.refs.LogoImage.classList.remove('dock');
    setTimeout( () => this.setState({ start: false }), 300 );
  }
  showMenuHandler = () => {
    this.setState({ showMenu: true });
  }
  render() {
    return (
      <div className='App'>
        <img alt='snake' src={ snake } ref='LogoImage' className={ this.state.showMenu ? 'banner' : 'banner center'}/>
        {this.state.start ?
          <Board gameState={ this.gameState } reset={ this.stopGame }/>
          :
          <Settings start={ this.startGame } showMenuHandler={ this.showMenuHandler } showMenu={ this.state.showMenu }/>
        }
      </div>
    );
  }
}
export default App;