import * as actionTypes from './actionTypes'

export const setSetting = ( setting, value ) => ({
    type: actionTypes.SET_SETTING,
    setting, value
})

export const changeMode = mode => ({
    type: actionTypes.CHANGE_MODE,
    newGameMode: mode
})