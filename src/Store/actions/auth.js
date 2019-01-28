import * as actionTypes from './actionTypes'

import axios from 'axios'

const authStart = () => ({
    type: actionTypes.START_AUTH
})
const loginResponse = ( res, nick ) => ({
    type: actionTypes.LOGIN_SUCCESS,
    token: res.idToken,
    userId: res.localId,
    userName: nick
})
const loginError = error => ({
    type: actionTypes.LOGIN_ERROR,
    error: error.replace('EMAIL', 'NICKNAME')
})
export const login = ({ login:{ Nickname, Password }, path }) => dispatch => {
    dispatch( authStart() )
    if (Nickname.length < 4) return dispatch( loginError( 'NICKNAME_TO_SHORT' ))
    const authData = {
        email: Nickname + '@snake.com',
        password: Password,
        returnSecureToken: true
    }
    let url= `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${ path }?key=AIzaSyBRraYm45nBCy-F7Ka-3lx04FFmBGGMoYI`
    axios.post( url, authData )
        .then( response => {
            dispatch( loginResponse( response.data, Nickname ))
        })
        .catch( error => {
            dispatch( loginError( error.response.data.error.message ))
        })
}