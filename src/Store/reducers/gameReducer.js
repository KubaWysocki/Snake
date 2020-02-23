import * as actions from '../actions/actionTypes'

const initialState = {
    acceleration: false,
    board: { width: 30, height: 23 },
    border: false,
    speed: 160
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actions.SET_SETTING:   return{ ...state, [action.setting]: action.value }
        case actions.CHANGE_MODE:   return{ ...action.newGameMode }
        default: return state
    }
}

export default reducer