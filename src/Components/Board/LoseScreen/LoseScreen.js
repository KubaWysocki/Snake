import React from 'react'
import './LoseScreen.css'

const LoseScreen = props =>
    <div className='shadow'>
        <div className='gameOver'>{ (!props.auth && "Game Over!" ) || props.highscore || "Wait..." }</div>
    </div>

export default LoseScreen