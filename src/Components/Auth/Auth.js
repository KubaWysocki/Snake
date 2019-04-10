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
        login: {
            Nickname: localStorage.getItem('nickname'),
            Password: localStorage.getItem('password'),
        },
        path: 'verifyPassword'
    }
    componentWillMount = () => {
        if( localStorage.getItem('nickname') === null ) this.setState({path: 'signupNewUser'})
    }
    componentDidMount = () => {
        if( localStorage.getItem('nickname') === null ) this.refs.loginMode.classList.toggle('active')
    }
    inputChanged = ( event, key ) => this.setState({ login: {...this.state.login, [key]: event.target.value }})

    changeLoginMode = path => {
        this.setState({ path })
        this.refs.loginMode.classList.toggle('active')
    }
    render = () => (
        <div className='flag'>
            <div className='Auth'>
                <div ref='loginMode' className='toggler'>
                    <Setting options={{ signin: 'verifyPassword',
                                        signup: 'signupNewUser' }} 
                            checkedValue={ this.state.path }
                            change={ path => this.changeLoginMode(path) }
                    />
                </div>
                <Inputs authData={ this.state.login } change={ this.inputChanged }/>

                <button onClick={() => this.props.login( this.state, this.props.history )}> LOGIN </button>
                <Link to='/settings' className='offline'> OFFLINE </Link>
            { this.props.loading ? <Spinner/> : null }
            </div>
            { this.props.error ? <div className='error'> Something went wrong! <br/>{ this.props.error } </div> : null }
        </div>)
}

const mapStateToProps = state => ({
    auth: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading
})
const mapDispatchToProps = dispatch => ({
    login: ( data, router ) => dispatch( login( data, router ))
})
export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Auth ) )