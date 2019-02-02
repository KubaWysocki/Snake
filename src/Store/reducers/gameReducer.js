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
        case actions.CHANGE_MODE:   return{ acceleration: action.settings[0],
                                            board: { width: action.settings[1][0], height: action.settings[1][1] },
                                            border: action.settings[2],
                                            speed: action.settings[3] }
        default: return state
    }
}
export default reducer;