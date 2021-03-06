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
            username: this.props.username || '',
            password: '',
        },
        path: !this.props.username ? 'signupNewUser' : 'verifyPassword'
    }

    componentDidMount = () => {
        if( !this.props.username ) this.refs.loginMode.classList.toggle('active')
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
            { this.props.errors
                ? <div className='error'> Something went wrong!{ this.props.errors.map( err => <div key={err}>{err}</div> ) }</div>
                : null
            }
        </div>
}

const mapStateToProps = state => ({
    username: state.auth.username,
    errors: state.auth.errors,
    loading: state.auth.loading
})

const mapDispatchToProps = { login }

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Auth ) )