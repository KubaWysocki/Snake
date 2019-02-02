import * as actionTypes from './actionTypes'

import allGameModes from './allGameModes.json'

export const changeMode = ( actualMode, direction ) => {
    let index = allGameModes.indexOf( actualMode )
    if( direction === 'prev' ) index--
    if( direction === 'next' ) index++
    if( index > 35 ) index = 0;
    if( index < 0 )  index = 35;
    let settings = allGameModes[ index ].split('-')
        settings[0] = settings[0] === 'true'
        settings[1] = settings[1].split('x').map(el => +el)
        settings[2] = settings[2] === 'true'
        settings[3] = +settings[3]
    return { type: actionTypes.CHANGE_MODE, settings }
}