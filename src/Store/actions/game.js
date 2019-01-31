import * as actionTypes from './actionTypes'

import axios from '../../axiosFirebase'

import allGameModes from './allGameModes.json'

const scoreboard = (gameMode, scoreboard) => ({
    type: actionTypes.CHANGE_MODE, 
    mode: gameMode,
    scoreboard
})
const loading = () => ({
    type: actionTypes.LOAD_SCOREBOARD,
    loading: true
})
export const changeMode = ( actualMode, prev_next ) => dispatch => {
    dispatch( loading() )
    let index = allGameModes.indexOf(actualMode)
    if( prev_next === 'prev' ) index-=1;
    if( prev_next === 'next' ) index+=1;
    if( index > 35 ) index = 0;
    if( index < 0 ) index = 35;
    let mode = allGameModes[ index ].split('-')
    mode[0] = mode[0] === 'true'
    mode[1] = mode[1].split('x')
    mode[2] = mode[2] ==='true'
    const gameMode = {
        acceleration: mode[0],
        board: { width: +mode[1][0], height: +mode[1][1] },
        border: mode[2],
        speed: +mode[3]
    }
    axios.get(allGameModes[ index ]+'.json')
        .then (response => {
            dispatch( scoreboard( gameMode, Object.values( response.data )))
        })
}