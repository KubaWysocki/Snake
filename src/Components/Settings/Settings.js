import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import './Settings.css'

import Setting from '../UI/Setting/Setting'
import { setSetting } from '../../Store/actions/game'

class Settings extends Component {
    render = () =>
        <div className='flag'>
            <div className='Settings'>
                <Setting options={{ small: '20x15',
                                    medium: '30x23',
                                    large: '40x30' }}
                            checkedValue={ this.props.board }
                            change={ value  => this.props.setSetting( 'board', value )}
                > PICK BOARD SIZE: </Setting>
                <Setting options={{ border: true, 
                                    standard: false }} 
                            checkedValue={ this.props.border }
                            change={ value  => this.props.setSetting( 'border', value )}
                > SELECT BORDER MODE: </Setting>
                <Setting options={{ accelerating: true,
                                    constant: false }}
                            checkedValue={ this.props.acceleration }
                            change={ value  => this.props.setSetting( 'acceleration', value )}
                > SET SPEED MODE: </Setting>
                <Setting options={{ slow: 240,
                                    normal: 160,
                                    fast: 80 }} 
                            checkedValue={ this.props.speed }
                            change={ value  => this.props.setSetting( 'speed', value )}
                > CHOOSE SPEED: </Setting>
                <br/><br/>
                <Link to='/game' className='Button startButton' > START </Link>
                { this.props.auth ?
                    <Link to='/scoreboard' className='Button startButton'> SCOREBOARD </Link>
                    :null
                }
            </div>
        </div>
}

const mapStateToProps = state => ({
    acceleration: state.game.acceleration,
    board: state.game.board,
    border: state.game.border,
    speed: state.game.speed,
    auth: state.auth.access
})

const mapDispatchToProps = { setSetting }

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Settings ) )