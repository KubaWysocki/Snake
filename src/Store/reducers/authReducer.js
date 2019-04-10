import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    userName: null,
    error: null,
    loading: false,
    expirationTime: false
}
const reducer = ( state= initialState, action) => {
    switch( action.type ){
        case actionTypes.START_AUTH:    return { ...state, loading: true }
        case actionTypes.LOGIN_ERROR:   return { ...state, loading: false, error: action.error }
        case actionTypes.LOGIN_SUCCESS: return { token: action.token, 
                                                 userId: action.userId, 
                                                 userName: action.userName,
                                                 error: null, 
                                                 loading: false, 
                                                 expirationTime: false }
        case actionTypes.EXPIRATION_TIME: return { ...state, expirationTime: true, userId: null, token: null } 
        default: return state
    }
}
export default reducer