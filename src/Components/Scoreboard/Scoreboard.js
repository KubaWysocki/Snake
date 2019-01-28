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
                        { this.state.scoreboard.length === 0 && !this.state.loading ? 'There are no scores in this game mode' : null }
                        { this.state.scoreboard.length  ? 
                            this.state.scoreboard
                                .sort((a,b)=>b[1]-a[1])
                                .map( ( el, i ) => {
                                return <div key={el[0]}>
                                    {i+1+'.'}
                                    { el[0] } &nbsp;
                                    { el[1] }
                                </div>
                            }) : null
                        }
                    </div>
                    <button className='Button' 
                            style={{margin: '1vh auto'}}
                            onClick={() => {
                                this.props.exit()
                                this.refs.flag.classList.add('hide')
                            }}
                            > BACK </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userData: state.auth
})
export default connect( mapStateToProps )( Scoreboard )