import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { throttle } from 'lodash'

import './Board.css'

import LoseScreen from './LoseScreen/LoseScreen'
import Controls from './Controls/Controls'

class Board extends Component {
    state = {
        speed: this.props.speed,
        snake: {
            X: 13,
            Y: 10,
            snakeLength: 2,
        },
        tailPositions: ['12,10','13,10'],
        pointPosition: null,
        direction: 'e',
        gameOver: false,
        highscoreResponse: null
    }

    timeoutID = 0

    componentDidMount = () => {
        window.addEventListener( 'keydown', this.throttledControls )
        this.points()
        setTimeout( () => this.timeoutID = setTimeout( this.actionFunc, this.state.speed ), 500)
    }

    componentDidUpdate = () => this.state.gameOver ? clearTimeout( this.timeoutID ) : null

    componentWillUnmount = () => clearTimeout( this.timeoutID )

    actionFunc = () => {
        this.timeoutID = setTimeout( this.actionFunc, this.state.speed )
        this.move( this.state.snake, this.state.direction )
        this.game( this.state.snake, this.state.tailPositions )
    }
    
    move = ({ X, Y, snakeLength }, direction ) => {
        if( direction === 'n' ) Y--
        if( direction === 's' ) Y++
        if( direction === 'e' ) X++
        if( direction === 'w' ) X--
    
        if( this.props.border ){
          if( X >= this.props.board.width || X < 0 || Y >= this.props.board.height || Y < 0) this.gameOver()
        }
        else{
            if( X < 0 ) X=this.props.board.width-1
            if( Y < 0 ) Y=this.props.board.height-1
            if( X > this.props.board.width-1 ) X=0
            if( Y > this.props.board.height-1 ) Y=0
        }
        this.setState(() => ({ snake:{ X, Y, snakeLength }}))
    }
    
    game = ({ X, Y, snakeLength }, tailPositions) => {
        document.querySelectorAll('.arrow').forEach( el => el.style.pointerEvents = 'auto' )

        let headPosition = X +','+ Y
        tailPositions.push( headPosition )
        tailPositions = tailPositions.slice( -snakeLength )
        this.setState(() => ({ tailPositions }))

        for( let i=0; i<tailPositions.length-1; i++ ){
            if( headPosition === tailPositions[i] ) this.gameOver()
        }

        if( headPosition === this.state.pointPosition ){
            snakeLength += 1
            this.setState(() => ({ snake: { X, Y, snakeLength }}))
            if( this.props.acceleration && this.state.speed>=16 ){
                let speed = this.state.speed
                speed -= 2
                this.setState(() => ({ speed }))
            }
            this.points()
        }
    }
    
    controls = ( e ) => {
        document.querySelectorAll('.arrow').forEach( el => el.style.pointerEvents = 'none' )
        let direction = this.state.direction
        if(( e.key==='w'||e.key==='W'||e.key==='ArrowUp'||e==='n' ) && direction!=='s' ) direction = 'n'
        if(( e.key==='s'||e.key==='S'||e.key==='ArrowDown'||e==='s' ) && direction!=='n' ) direction = 's'
        if(( e.key==='d'||e.key==='D'||e.key==='ArrowRight'||e==='e' ) && direction!=='w' ) direction = 'e'
        if(( e.key==='a'||e.key==='A'||e.key==='ArrowLeft'||e==='w' ) && direction!=='e' ) direction = 'w'
        this.setState(() => ({ direction }))
    }
    
    throttledControls = throttle( this.controls, this.state.speed, { leading: true } )
    
    points = () => {
        let exit = false,
            pointPosition = Math.floor(Math.random()*this.props.board.width) +','+ Math.floor(Math.random()*this.props.board.height)
        this.state.tailPositions.forEach( el => { if( pointPosition === el ) { this.points(); exit = true }})
        if( exit ) return
        this.setState(() => ({ pointPosition }))
    }
    
    gameOver = () => {
        this.setState(() => ({gameOver: true}))
        if( this.props.auth.access ) {
            fetch( 'http://127.0.0.1:8000/api/scores', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.props.auth.access}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ score: this.state.snake.snakeLength-2, ...this.props.gameMode })
            })
            .then( res => res.json() )
            .then( res => this.setState({ highscoreResponse: res }))
            .catch( err => console.log( err ))
        }
    }
    
    render = () =>
        <div className='flag'>
            <div className='holder'>
                <div className='Board'>
                    <div className={ this.props.border ? 'border' : 'border-less' }>
                        { [...Array(this.props.board.width)]
                            .map(( _, i ) => {
                                return(
                                    <div className='col' key={ i }>
                                    {
                                        [...Array(this.props.board.height)]
                                        .map(( _, j ) => {
                                            let tileClass = 'tile',
                                                cord = i+','+j
                                            this.state.tailPositions.forEach( el => { if(el === cord) tileClass = 'snake tile'})
                                            if(this.state.pointPosition === cord) tileClass = 'point tile'
                                            return <div className={ tileClass } key={ cord }></div>
                                        })
                                    }
                                    </div>
                                )
                            })
                        }
                        { this.state.gameOver ? <LoseScreen highscore={this.state.highscoreResponse}/> : null }
                    </div>
                </div>
                <div className='bottom'>
                    <span>SCORE: { this.state.snake.snakeLength-2 }</span>
                    <Link to='/settings' className='Button reset'>RESET</Link>
                </div>
            </div>
            <Controls controls={ this.throttledControls }/>
        </div>
}

const mapStateToProps = state => ({
    acceleration: state.game.acceleration,
    board: state.game.board,
    border: state.game.border,
    speed: state.game.speed,
    auth: state.auth
})

export default withRouter( connect( mapStateToProps )( Board ) )