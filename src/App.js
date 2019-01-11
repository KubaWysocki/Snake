import React, { Component } from 'react';

import './App.css';
import snake from './snake.png';

import Settings from './Components/Settings/Settings';
import Board from './Components/Board/Board';

class App extends Component {
  state = {
    start: false,
    showMenu: false,
    gameState: {
      acceleration: false,
      board: { width: 30, height: 23 },
      border: false,
      speed: 160
    }
  }
  startGame = ( gameState ) => {
    this.setState({ gameState });
    this.refs.LogoImage.classList.add('dock');
    setTimeout( () => this.setState({ start: true }), 300 );
  }
  stopGame = () => {
    this.refs.LogoImage.classList.remove('dock');
    setTimeout( () => this.setState({ start: false }), 300 );
  }
  showMenuHandler = () => this.setState({ showMenu: true });
  
  render() {
    return (
      <div className='App'>
        <div ref='LogoImage' className={ this.state.showMenu ? 'banner' : 'banner center' }>
          <img alt='snake' src={ snake }/>
        </div>
        {this.state.start ?
          <Board 
            gameState={ this.state.gameState } 
            reset={ this.stopGame }
          />
          :
          <Settings 
            start={ this.startGame } 
            showMenuHandler={ this.showMenuHandler } 
            showMenu={ this.state.showMenu }
            gameState={ this.state.gameState }
          />
        }
      </div>
    );
  }
}
export default App;