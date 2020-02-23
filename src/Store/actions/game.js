import * as actionTypes from './actionTypes'
import { isEqual } from 'lodash'

export const changeMode = ( direction, oldGameMode, allScoreboards ) => {
    let index = 0
    allScoreboards.forEach(( board, i ) => 
        isEqual( board, oldGameMode ) ? index = i : null
    )
    if( direction === 'prev' ) index--
    if( direction === 'next' ) index++
    if( index >= allScoreboards.length ) index = 0
    if( index < 0 )  index = allScoreboards.length - 1

    const board_size = allScoreboards[index].board.split('x').map( s => Number(s) )

    const newGameMode = {
        ...allScoreboards[index],
        board: {
            width: board_size[0],
            height: board_size[1]
        }
    }
    return { type: actionTypes.CHANGE_MODE, newGameMode }
}