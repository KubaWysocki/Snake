import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './Board.css'

import LoseScreen from './LoseScreen/LoseScreen'
import Controls from './Controls/Controls'

class Board extends Component {
    constructor( props ) {
        super( props )
        const [ width, height ] = props.gameMode.board.split('x').map( i => Number(i) )
        this.board = { width, height }
        this.speed = props.gameMode.speed
        this.acceleration = props.gameMode.acceleration
        this.border = props.gameMode.border
        this.timeoutID = 0
        this.controlsLock = false
        this.direction = 'e'
    }

    state = {
        snake: {
            X: 13,
            Y: 10,
            snakeLength: 2,
        },
        tailPositions: ['12,10','13,10'],
        pointPosition: null,
        gameOver: false,
        highscoreResponse: null
    }

    componentDidMount = () => {
        window.addEventListener( 'keydown', this.controls )
        this.points()
        setTimeout( () => this.timeoutID = setTimeout( this.actionFunc, this.speed ), 500)
    }

    componentDidUpdate = () => this.state.gameOver ? clearTimeout( this.timeoutID ) : null

    componentWillUnmount = () => clearTimeout( this.timeoutID )

    actionFunc = () => {
        this.timeoutID = setTimeout( this.actionFunc, this.speed )
        this.move( this.state.snake, this.direction )
        this.game( this.state.snake, this.state.tailPositions )
        this.controlsLock = false
    }
    
    move = ({ X, Y, snakeLength }, direction ) => {
        if( direction === 'n' ) Y--
        if( direction === 's' ) Y++
        if( direction === 'e' ) X++
        if( direction === 'w' ) X--
    
        if( this.border && (X >= this.board.width || X < 0 || Y >= this.board.height || Y < 0))
            this.gameOver()
        else{
            if( X < 0 ) X=this.board.width-1
            if( Y < 0 ) Y=this.board.height-1
            if( X > this.board.width-1 ) X=0
            if( Y > this.board.height-1 ) Y=0
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
            if( this.acceleration && this.speed>=16 ) this.speed -= 2
            this.points()
        }
    }
    
    controls = ( e ) => {
        if( this.controlsLock ) return
        this.controlsLock = true
        document.querySelectorAll('.arrow').forEach( el => el.style.pointerEvents = 'none' )
        if(( e.key==='w'||e.key==='W'||e.key==='ArrowUp'||e==='n' ) && this.direction!=='s' ) this.direction = 'n'
        if(( e.key==='s'||e.key==='S'||e.key==='ArrowDown'||e==='s' ) && this.direction!=='n' ) this.direction = 's'
        if(( e.key==='d'||e.key==='D'||e.key==='ArrowRight'||e==='e' ) && this.direction!=='w' ) this.direction = 'e'
        if(( e.key==='a'||e.key==='A'||e.key==='ArrowLeft'||e==='w' ) && this.direction!=='e' ) this.direction = 'w'
    }
    
    points = () => {
        let exit = false,
            pointPosition = Math.floor(Math.random()*this.board.width) +','+ Math.floor(Math.random()*this.board.height)
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
                    <div className={ this.border ? 'border' : 'border-less' }>
                        { [...Array(this.board.width)]
                            .map(( _, i ) =>
                                <div className='col' key={ i }>
                                {[...Array(this.board.height)]
                                    .map(( _, j ) => {
                                        let tileClass = 'tile',
                                            cord = i+','+j
                                        this.state.tailPositions.forEach( el => { if( el === cord ) tileClass = 'snake tile' })
                                        if(this.state.pointPosition === cord) tileClass = 'point tile'
                                        return <div className={ tileClass } key={ cord }></div>
                                    })
                                }</div>
                            )
                        }
                        { this.state.gameOver ? <LoseScreen highscore={this.state.highscoreResponse} auth={this.props.auth.access}/> : null }
                    </div>
                </div>
                <div className='bottom'>
                    <span>SCORE: { this.state.snake.snakeLength-2 }</span>
                    <Link to='/settings' className='Button reset'>RESET</Link>
                </div>
            </div>
            <Controls controls={ this.controls }/>
        </div>
}

const mapStateToProps = state => ({
    gameMode: state.game, 
    auth: state.auth
})

export default withRouter( connect( mapStateToProps )( Board ) )