import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isEqual } from 'lodash'

import config from '../../config'
import { changeMode } from '../../Store/actions/game'

import './Scoreboard.css'

import Spinner from '../UI/Spinner/Spinner'

class Scoreboard extends Component {
    state = {
        activeGameMode: -1,
        scoreboard: [],
        allScoreboards: [],
        loading: true
    }

    componentDidMount = () => {
        this.getAllScoreboards()
    }
    
    getScoreboard = activeGameMode =>
        fetch( config.GET_SCOREBOARD + this.state.allScoreboards[activeGameMode].id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.props.auth.access}`,
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json() )
        .then( res => this.setState({ scoreboard: res, loading: false, activeGameMode }) )
    
    getAllScoreboards = () =>
        fetch( config.GET_GAMEMODES, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.props.auth.access}`,
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json() )
        .then( allScoreboards => {
            allScoreboards = allScoreboards.map(({ id, ...gameMode }) => ({ id, gameMode }))
            this.setState(() => ({ allScoreboards }))
            let activeGameMode = -1
            allScoreboards.forEach(( scoreboard, i ) =>
                isEqual( scoreboard.gameMode, this.props.gameMode ) ? activeGameMode = i : null
            )
            if( activeGameMode === -1 ) this.setState({ loading: false })
            else this.getScoreboard( activeGameMode )
        })
    
    changeMode = direction => {
        const gameModesRange = this.state.allScoreboards.length - 1
        if( gameModesRange > 0 ) {
            this.setState({ loading: true })
            let nextGameMode  = this.state.activeGameMode + direction
            if( nextGameMode < 0 ) nextGameMode = gameModesRange
            if( nextGameMode > gameModesRange ) nextGameMode = 0
            this.getScoreboard( nextGameMode )
            this.props.changeMode( this.state.allScoreboards[nextGameMode].gameMode )
        }
    }
    
    render = () => 
        <div className='holder'>
            <div className='Scoreboard'>
                <p>{ 
                    !this.state.loading 
                    && this.state.activeGameMode !== -1 
                    && '#' + this.state.allScoreboards[this.state.activeGameMode].id 
                }</p>
                <div className='scoreList'>
                { this.state.loading
                    ? <Spinner/>
                    : this.state.activeGameMode === -1
                        ? <>
                            <div>Scoreboard does not exist yet!</div>
                            <div>Play game in this mode to create scoreboard!</div>
                          </>
                        : this.state.scoreboard.map(( record, i ) =>
                            <div key={ record.user }
                            className={ this.props.auth.username === record.user ? 'record userRecord' : 'record'}>
                                <div className='sides'>{i+1+'.'}</div>
                                <div className='nick'>{ record.user }</div>
                                <div className='sides'>{ record.score }</div>
                            </div>)
                }</div>
            </div>
            <div className='modeNavigation'>
                {this.state.allScoreboards.length ? <div onClick={() => this.changeMode(-1) }></div> : null}
                <Link to='/settings' className='Button back'>GAME MODES</Link>
                {this.state.allScoreboards.length ? <div onClick={() => this.changeMode(1) }></div> : null}
            </div>
        </div>
}

const mapStateToProps = state => ({
    auth: state.auth,
    gameMode: state.game
})

const mapDispatchToProps = { changeMode }

export default connect( mapStateToProps, mapDispatchToProps )( Scoreboard )