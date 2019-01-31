import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axiosFirebase'

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
        gameOver: false
    }
    timeoutID = 0;
    componentDidMount(){
        this.points();
        if( this.props.border ) this.refs.boardClass.className = 'border'
        setTimeout( () => this.timeoutID = setTimeout( this.actionFunc, this.state.speed ), 500)
        setTimeout( () => this.refs.flag.classList.remove('show'), 50 )
    }
    componentDidUpdate(){
        if( this.state.gameOver ) clearTimeout( this.timeoutID )
    }
    componentWillUnmount(){
        clearTimeout( this.timeoutID )
    }

    actionFunc = () => {
        this.timeoutID = setTimeout( this.actionFunc, this.state.speed )
        this.move( this.state.snake )
        this.game( this.state.snake, this.state.tailPositions )
    }
    move = ({ X, Y, snakeLength }) => {
        if( this.state.direction === 'n' ) Y--
        if( this.state.direction === 's' ) Y++
        if( this.state.direction === 'e' ) X++
        if( this.state.direction === 'w' ) X--
    
        if( this.props.border ){
          if( X >= this.props.board.width || X < 0 || Y >= this.props.board.height || Y < 0) this.gameOver()
        }
        else{
            if( X < 0 ) X=this.props.board.width-1
            if( Y < 0 ) Y=this.props.board.height-1
            if( X > this.props.board.width-1 ) X=0
            if( Y > this.props.board.height-1 ) Y=0
        }
        this.setState({ snake:{ X, Y, snakeLength }})
    }
    game = ({ X, Y, snakeLength }, tailPositions) => {
        window.addEventListener( 'keydown', this.controls )
        document.querySelectorAll('.arrow').forEach( el => el.style.pointerEvents = 'auto' )

        let headPosition = X +','+ Y
        tailPositions.push( headPosition )
        tailPositions = tailPositions.slice( -snakeLength )
        this.setState({ tailPositions })

        for( let i=0; i<tailPositions.length-1; i++ ){
            if( headPosition === tailPositions[i] ) this.gameOver()
        }

        if( headPosition === this.state.pointPosition ){
            snakeLength += 1
            this.setState({ snake: { X, Y, snakeLength }})
            if( this.props.acceleration && this.state.speed>=16 ){
                let speed = this.state.speed
                speed -= 2
                this.setState({ speed })
            }
            this.points();
        }
    }
    controls = ( e ) => {
        window.removeEventListener('keydown', this.controls)
        document.querySelectorAll('.arrow').forEach( el => el.style.pointerEvents = 'none' )
        let direction = this.state.direction
        if(( e.key==='w'||e.key==='W'||e.key==='ArrowUp'||e==='n' ) && direction!=='s' ) direction = 'n'
        if(( e.key==='s'||e.key==='S'||e.key==='ArrowDown'||e==='s' ) && direction!=='n' ) direction = 's'
        if(( e.key==='d'||e.key==='D'||e.key==='ArrowRight'||e==='e' ) && direction!=='w' ) direction = 'e'
        if(( e.key==='a'||e.key==='A'||e.key==='ArrowLeft'||e==='w' ) && direction!=='e' ) direction = 'w'
        this.setState({ direction })
    }
    points = () => {
        let exit = false,
            pointPosition = Math.floor(Math.random()*this.props.board.width) +','+ Math.floor(Math.random()*this.props.board.height)
        this.state.tailPositions.forEach( el => { if( pointPosition === el ) { this.points(); exit = true }})
        if( exit ) return
        this.setState({ pointPosition })
    }
    gameOver = () => {
        this.setState({gameOver: true})
        if( this.props.userData.token ) {
            axios.get(this.props.gameMode+'/'+this.props.userData.userId+'.json')
            .then( response => {
                if ( response.data === null || response.data[1] < this.state.snake.snakeLength-2 ) {
                    axios.put(this.props.gameMode+'/'+this.props.userData.userId+'.json', [this.props.userData.userName, this.state.snake.snakeLength-2])
                }
            })
        }
    }
    render() {
        return(
            <div className='flag show' ref='flag'>
                <div className='holder'>
                    <div className='Board'>
                        <div className='border-less' ref='boardClass'>
                            { [...Array(this.props.board.width)]
                                .map(( _, i ) => {
                                    return(
                                        <div className='col' key={ i }>
                                        {
                                            [...Array(this.props.board.height)]
                                            .map(( _, j ) => {
                                                let tileClass = 'tile',
                                                    cord = i+','+j
                                                this.state.tailPositions.forEach( el => { if(el===cord) tileClass = 'snake tile'})
                                                if(this.state.pointPosition===cord) tileClass = 'point tile'
                                                return <div className={ tileClass } key={ cord }></div>
                                            })
                                        }
                                        </div>
                                    )
                                })
                            }
                            { this.state.gameOver ? <LoseScreen/> : null }
                        </div>
                    </div>
                    <div className='bottom'>
                        <span>SCORE: { this.state.snake.snakeLength-2 }</span>
                        <button className='Button reset'
                                onClick={() => {
                                    this.refs.flag.classList.add('hide')
                                    this.props.reset()
                        }}>RESET</button>
                    </div>
                </div>
                <Controls controls={ this.controls }/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    acceleration: state.game.acceleration,
    board: state.game.board,
    border: state.game.border,
    speed: state.game.speed,
    userData: state.auth
})
export default connect( mapStateToProps )( Board );