import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import './App.css'
import snake from './assets/snake.png'

import { autoLogin } from './Store/actions/auth'

import Settings from './Components/Settings/Settings'
import Board from './Components/Board/Board'
import Auth from './Components/Auth/Auth'
import Scoreboard from './Components/Scoreboard/Scoreboard'
import Spinner from './Components/UI/Spinner/Spinner'

class App extends Component {
  componentDidMount = () => {
    this.bannerPosition()
    this.props.autoLogin( this.props.history )
  }

  componentDidUpdate = () => this.bannerPosition()

  bannerPosition = () => {
    if( this.props.location.pathname !== '/auth' ) this.refs.LogoImage.classList.remove('center')
    if( this.props.location.pathname === '/game' ) this.refs.LogoImage.classList.add('dock')
    else this.refs.LogoImage.classList.remove('dock')
  }

  render = () => {
    const gameMode = {
      ...this.props.gameMode,
      board: this.props.gameMode.board.width + 'x' + this.props.gameMode.board.height
    }

    return (
      <div className='App'>
        <div ref='LogoImage' className='banner center'>
          <h1>
            <img alt='snake' src={ snake }/>
          </h1>
        </div>
        <TransitionGroup component={ React.Fragment }>
          <CSSTransition
            key={ this.props.location.key }
            classNames='route'
            timeout={{ enter: 600,   exit: 300 }}
            appear>
            <Switch location={ this.props.location }>
                <Route path='/game'       render={() => <Board gameMode={ gameMode }/>} />
                <Route path='/scoreboard' render={() => <Scoreboard gameMode={ gameMode }/>} />
                <Route path='/settings' component={ Settings } />
                <Route path='/auth'     component={ Auth } />
                <Route path='/'  exact  component={ Spinner } />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  autoLogin: router => dispatch( autoLogin( router ))
})

const mapStateToProps = state => ({
  gameMode: state.game,
  auth: state.auth
})

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ))