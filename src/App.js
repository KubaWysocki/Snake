import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'
import snake from './assets/snake.png'

import Settings from './Components/Settings/Settings'
import Board from './Components/Board/Board'
import Auth from './Components/Auth/Auth'
import Scoreboard from './Components/Scoreboard/Scoreboard'

class App extends Component {

  componentDidMount() {
    if ( this.props.location.pathname !== '/' ) this.refs.LogoImage.classList.remove('center')
  }
  loginContinue = () => {
    this.refs.LogoImage.classList.remove('center')
    setTimeout( () => this.props.history.push('/settings'), 300 )
  }
  enterScoreboard = () => {
    setTimeout( () => this.props.history.push('/scoreboard'), 300 )
  }
  exitScoreboard = () => {
    setTimeout( () => this.props.history.push('/settings'), 300 )
  }
  startGame = () => {
    this.refs.LogoImage.classList.add('dock')
    setTimeout( () => this.props.history.push('/game'), 300 )
  }
  stopGame = () => {
    this.refs.LogoImage.classList.remove('dock')
    setTimeout( () => this.props.history.push('/settings'), 300 ) 
  }  
  render() {
    const gameMode = Object.values( this.props.gameMode )
            .map(( el, i ) => {
                if( typeof el == 'object' ) return Object.values( this.props.gameMode[ Object.keys( this.props.gameMode )[i]]).join('x')
                else return el
            }).join('-')
    return (
      <div className='App'>
        <div ref='LogoImage' className='banner center'>
          <img alt='snake' src={ snake }/>
        </div>
        <Switch>
          <Route path='/game' render={() => <Board reset={ this.stopGame } gameMode={ gameMode }/>} />
          <Route path='/scoreboard' render={() => <Scoreboard exit={ this.exitScoreboard } gameMode={ gameMode }/>} />
          <Route path='/settings' render={() => <Settings startGame={ this.startGame } scoreboard={ this.enterScoreboard }/>} />
          <Route path='/' exact render={() => <Auth loginContinue={ this.loginContinue }/>} />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  gameMode: state.game
})
export default withRouter( connect( mapStateToProps )( App ) )