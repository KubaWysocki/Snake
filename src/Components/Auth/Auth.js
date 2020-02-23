import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { login } from '../../Store/actions/auth'

import './Auth.css'

import Setting from '../UI/Setting/Setting'
import Inputs from './Inputs/Inputs'
import Spinner from '../UI/Spinner/Spinner'

class Auth extends Component {
    state = {
        auth: {
            username: this.props.auth || '',
            password: '',
        },
        path: !this.props.auth ? 'signupNewUser' : 'verifyPassword'
    }

    componentDidMount = () => {
        if( !this.props.auth ) this.refs.loginMode.classList.toggle('active')
    }

    inputChanged = ( event, key ) => this.setState({ auth: {...this.state.auth, [key]: event.target.value }})

    changeLoginMode = path => {
        this.setState({ path })
        this.refs.loginMode.classList.toggle('active')
    }

    login = () => this.props.login( this.state, this.props.history )

    render = () =>
        <div className='flag'>
            <div className='Auth'>
                <div ref='loginMode' className='toggler'>
                    <Setting options={{ signin: 'verifyPassword',
                                        signup: 'signupNewUser' }} 
                            checkedValue={ this.state.path }
                            change={ path => this.changeLoginMode(path) }
                    />
                </div>
                <Inputs authData={ this.state.auth } change={ this.inputChanged } login={ this.login }/>

                <button onClick={ this.login }> LOGIN </button>
                <Link to='/settings' className='offline'> OFFLINE </Link>
            { this.props.loading ? <Spinner/> : null }
            </div>
            { this.props.error ? <div className='error'> Something went wrong! <br/>{ this.props.error } </div> : null }
        </div>
}

const mapStateToProps = state => ({
    auth: state.auth.username,
    error: state.auth.error,
    loading: state.auth.loading
})

const mapDispatchToProps = dispatch => ({
    login: ( data, router ) => dispatch( login( data, router ))
})

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Auth ) )