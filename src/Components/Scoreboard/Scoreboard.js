import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import axios from '../../axiosFirebase'

import Spinner from '../UI/Spinner/Spinner'

import './Scoreboard.css'
import { changeMode } from '../../Store/actions/game';

class Scoreboard extends Component {
    state = {
        scoreboard: [],
        loading: true
    }
    componentDidMount = () => {
        this.getScoreboard()
    }
    componentDidUpdate = ( prevProps ) => {
        if ( this.props.gameMode !== prevProps.gameMode ) this.getScoreboard()
    }
    getScoreboard = () => {
        axios.get( this.props.gameMode +'.json?auth=' + this.props.userData.token )
            .then( response => {
                this.setState({ scoreboard: Object.values( response.data ), loading: false })
            })
    }
    changeMode = direction => {
        this.props.changeMode( this.props.gameMode, direction )
        this.setState({ loading: true })
    }
    render = () => (
        <div className='holder'>
            <div className='Scoreboard'>
                <div className='scoreList'>
                { this.state.loading ? <Spinner/> 
                    : this.state.scoreboard
                        .sort((a,b)=>b[1]-a[1])
                        .map( ( el, i ) =>  <div key={ el[0] } 
                                            className={ this.props.userData.userName === el[0] ? 'record userRecord' : 'record'}>
                                                <div className='sides'>{i+1+'.'}</div>
                                                <div className='nick'>{ el[0] }</div>
                                                <div className='sides' >{ el[1] }</div>
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
    )
}
const mapStateToProps = state => ({
    userData: state.auth,
    scoreboard: state.game.scoreboard,
    loading: state.game.loading
})
const mapDispatchToProps = dispatch => ({
    changeMode: ( actualMode, direction ) => dispatch( changeMode( actualMode, direction ))
})
export default connect( mapStateToProps, mapDispatchToProps )( Scoreboard )