import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logout } from '../../../Store/actions/auth'
import { gameModeToQueryString } from '../../../utils/querryString'

import './TopBar.css'

const TopBar = props => 
    <div className='TopBar'>
        <div>
            { props.auth.access && 
                <span onClick={() => 
                    navigator.clipboard.writeText(
                        window.location.href + '?' + gameModeToQueryString( props.gameMode )
                )}>SHARE</span>
            }
        </div>
        <div>{
            props.auth.access 
            ? <>
                {props.auth.username + ' | '}
                <span 
                    className='offline'
                    onClick={() => props.logout(props.history)}
                >LOGOUT</span>
              </>
            : <span 
                className='login'
                onClick={() => props.logout(props.history)}
              >LOGIN</span>
        }</div>
    </div>

const mapStateToProps = state => ({
    auth: state.auth,
    gameMode: state.game
})

const mapDispatchToProps = { logout }

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( TopBar ))