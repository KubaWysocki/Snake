import * as actions from '../actions/actionTypes'

const initialState = {
    acceleration: false,
    board: { width: 30, height: 23 },
    border: false,
    speed: 160,
    scoreboard: [],
    loading: true
}
const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actions.SET_SETTING: return{ ...state, [action.setting]: action.value }
        case actions.LOAD_SCOREBOARD: return{ ...state, loading: true }
        case actions.CHANGE_MODE: return{ ...state, ...action.mode, scoreboard: action.scoreboard, loading: false }
        default: return state
    }
}
export default reducer;