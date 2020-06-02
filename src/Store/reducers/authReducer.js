import * as actionTypes from '../actions/actionTypes'

const initialState = {
    access: null,
    refresh: localStorage.getItem('refresh'),
    username: localStorage.getItem('username'),
    errors: null,
    loading: false,
    autoLoginLoading: true
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.START_AUTH:            return { ...state, loading: true }
        case actionTypes.LOGOUT:                return { ...state, access: null, refresh: null }
        case actionTypes.AUTO_LOGIN_FAIL:       return { ...state, autoLoginLoading: false }
        case actionTypes.AUTO_LOGIN_RESPONSE:   return { ...state, autoLoginLoading: false, access: action.access }
        case actionTypes.LOGIN_ERROR:           return { ...state, loading: false, errors: action.error }
        case actionTypes.LOGIN_SUCCESS:         return { access: action.access,
                                                        refresh: action.refresh, 
                                                        username: action.username,
                                                        errors: null, 
                                                        loading: false }
        default: return state
    }
}

export default reducer