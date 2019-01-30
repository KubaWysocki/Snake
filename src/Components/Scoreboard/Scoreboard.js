import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axiosFirebase'
import Spinner from '../UI/Spinner/Spinner'

import './Scoreboard.css'

class Scoreboard extends Component {
    state = {
        loading: true,
        scoreboard: []
    }
    componentDidMount(){
        setTimeout( () => this.refs.flag.classList.remove('show'), 50 )
        axios.get(this.props.gameMode+'.json')
            .then( response => {
                this.setState({scoreboard: Object.values(response.data), loading: false})
            }).catch( error => {
                this.setState({loading: false})
            })
    }
    render() {
        return (
            <div className='flag show' ref='flag'>
                <div className='holder'>
                    <div className='Scoreboard'>
                        { this.state.loading ? <Spinner/> : null }
                        { this.state.scoreboard.length  ? 
                            this.state.scoreboard
                                .sort((a,b)=>b[1]-a[1])
                                .map( ( el, i ) =>  <div key={ el[0] } 
                                                    className={ this.props.userData.userName === el[0] ? 'record userRecord' : 'record'}>
                                                        <div className='lp'>{i+1+'.'}</div>
                                                        <div className='nick'>{ el[0] }</div>
                                                        <div className='score' >{ el[1] }</div>
                                                    </div>
                            ) : null
                        }
                    </div>
                    <button className='Button back' 
                            onClick={() => {
                                this.props.exit()
                                this.refs.flag.classList.add('hide')
                            }}> BACK </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userData: state.auth
})
export default connect( mapStateToProps )( Scoreboard )