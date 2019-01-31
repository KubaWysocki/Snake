import React, { Component } from 'react'
import { connect } from 'react-redux'

import Spinner from '../UI/Spinner/Spinner'

import './Scoreboard.css'
import { changeMode } from '../../Store/actions/game';

class Scoreboard extends Component {
    componentDidMount = () => {
        setTimeout( () => this.refs.flag.classList.remove('show'), 50 )
        this.props.nextMode(this.props.gameMode)
    }
    render() {
        return (
            <div className='flag show' ref='flag'>
                <div className='holder'>
                    <div className='Scoreboard'>
                        <div className='scoreList'>
                        { this.props.loading ? <Spinner/> 
                            : this.props.scoreboard
                                .sort((a,b)=>b[1]-a[1])
                                .map( ( el, i ) =>  <div key={ el[0] } 
                                                    className={ this.props.userData.userName === el[0] ? 'record userRecord' : 'record'}>
                                                        <div className='lp'>{i+1+'.'}</div>
                                                        <div className='nick'>{ el[0] }</div>
                                                        <div className='score' >{ el[1] }</div>
                                                    </div>)
                        }
                        </div>
                    </div>
                    <div className='modeNavigation'>
                        <div onClick={() => { this.props.nextMode( this.props.gameMode, 'prev' )}}></div>
                        <button className='Button back' 
                                onClick={() => {
                                    this.props.exit()
                                    this.refs.flag.classList.add('hide')
                                }}> BACK </button>
                        <div onClick={() => { this.props.nextMode( this.props.gameMode, 'next' )}}></div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userData: state.auth,
    scoreboard: state.game.scoreboard,
    loading: state.game.loading
})
const mapDispatchToProps = dispatch => ({
    nextMode: ( actualMode, np ) => dispatch( changeMode( actualMode, np ))
})
export default connect( mapStateToProps, mapDispatchToProps )( Scoreboard )