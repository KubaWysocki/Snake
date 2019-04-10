import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import './App.css'
import snake from './assets/snake.png'

import Settings from './Components/Settings/Settings'
import Board from './Components/Board/Board'
import Auth from './Components/Auth/Auth'
import Scoreboard from './Components/Scoreboard/Scoreboard'

class App extends Component {
  componentDidMount = () => this.bannerPosition()
  componentDidUpdate = (prevProps) => {
    if( prevProps.expirationTime !== this.props.expirationTime && this.props.expirationTime === true ) this.props.history.push('/')
    this.bannerPosition()
  }
  bannerPosition = () => {
    if ( this.props.location.pathname !== '/' ) this.refs.LogoImage.classList.remove('center')
    if( this.props.location.pathname === '/game' ) this.refs.LogoImage.classList.add('dock')
    else this.refs.LogoImage.classList.remove('dock')
  }
  render = () => {
    const gameMode = this.props.gameMode.acceleration
                    +'-'+this.props.gameMode.board.width
                    +'x'+this.props.gameMode.board.height
                    +'-'+this.props.gameMode.border
                    +'-'+this.props.gameMode.speed
    return (
      <div className='App'>
        <div ref='LogoImage' className='banner center'>
          <img alt='snake' src={ snake }/>
        </div>
        <TransitionGroup component={React.Fragment}>
          <CSSTransition
            key={this.props.location.key}
            classNames='route'
            timeout={{   enter: 600,   exit: 300   }}
            appear>
            <Switch location={this.props.location} >
                <Route path='/game'       render={() => <Board gameMode={ gameMode }/>} />
                <Route path='/scoreboard' render={() => <Scoreboard gameMode={ gameMode }/>} />
                <Route path='/settings'   component={ Settings } />
                <Route path='/' exact     component={ Auth } />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  gameMode: state.game,
  expirationTime: state.auth.expirationTime
})
export default withRouter( connect( mapStateToProps )( App ))