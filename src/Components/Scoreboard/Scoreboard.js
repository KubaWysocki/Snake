import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { changeMode } from '../../Store/actions/game'

import './Scoreboard.css'

import Spinner from '../UI/Spinner/Spinner'

class Scoreboard extends Component {
    state = {
        scoreboard: [],
        allScoreboards: [],
        loading: true
    }

    componentDidMount = () => {
        if( this.props.auth.access ) {
            this.getScoreboard()
            this.getAllScoreboards()
        }
    }
    
    componentDidUpdate = ( prevProps ) => {
        if ( this.props.access && this.props.gameMode !== prevProps.gameMode ) this.getScoreboard()
    }
    
    getScoreboard = () => {
        const queryParams = Object.entries(this.props.gameMode).map(e => e.join('=')).join('&')
        fetch( 'http://127.0.0.1:8000/api/scores?' + queryParams, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.props.auth.access}`,
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json() )
        .then( res => this.setState({ scoreboard: res, loading: false }) )
    }
    
    getAllScoreboards = () => {
        fetch( 'http://127.0.0.1:8000/api/gamemodes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.props.auth.access}`,
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json() )
        .then( allScoreboards => this.setState({ allScoreboards }))
    }
    
    changeMode = direction => {
        if( this.state.allScoreboards.length ) {
            this.setState({ loading: true })
            this.props.changeMode( direction, this.props.gameMode, this.state.allScoreboards )
        }
    }
    
    render = () => 
        <div className='holder'>
            <div className='Scoreboard'>
                <div className='scoreList'>
                { this.state.loading 
                    ? <Spinner/> 
                    : typeof this.state.scoreboard === 'string'
                        ? this.state.scoreboard.split(';').map( el => <div key={el}>{ el }</div>)
                        : this.state.scoreboard.map( ( record, i ) =>
                            <div key={ record.user }
                            className={ this.props.auth.username === record.user ? 'record userRecord' : 'record'}>
                                <div className='sides'>{i+1+'.'}</div>
                                <div className='nick'>{ record.user }</div>
                                <div className='sides'>{ record.score }</div>
                            </div>)
                }
                </div>
            </div>
            <div className='modeNavigation'>
                <div onClick={() => { this.changeMode('prev') }}></div>
                <Link to='/settings' className='Button back'> BACK </Link>
                <div onClick={() => { this.changeMode('next') }}></div>
            </div>
        </div>
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    changeMode: (  direction, oldGameMode, allScoreboards  ) => dispatch( changeMode( direction, oldGameMode, allScoreboards ))
})

export default connect( mapStateToProps, mapDispatchToProps )( Scoreboard )