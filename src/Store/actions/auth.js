import * as actionTypes from './actionTypes'

const authStart = () => ({
    type: actionTypes.START_AUTH
})

const loginResponse = ({ access, refresh }, username ) => ({
    type: actionTypes.LOGIN_SUCCESS,
    access,
    refresh,
    username
})

const autoLoginResponse = access => ({
    type: actionTypes.AUTO_LOGIN_RESPONSE,
    access
})

const loginError = error => ({
    type: actionTypes.LOGIN_ERROR,
    error
})

const loginRefresh = () => dispatch => {
    setTimeout(() => {
        dispatch( autoLogin() )
    }, 104400000 )
}

const verify = ( auth, jsonData, router ) => dispatch => {
    fetch( 'http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then( res => res.json() )
    .then( res => {
        if( res.access && res.refresh ) {
            localStorage.setItem('username', auth.username)
            localStorage.setItem('refresh', res.refresh)
            dispatch( loginResponse( res, auth.username ))
            router.replace('/settings')
        }
        else if( res.detail === 'No active account found with the given credentials' ) 
            dispatch( loginError( res.detail ))
    })
}

export const login = ({ auth, path }, router) => dispatch => {
    dispatch( authStart() )
    const jsonData = JSON.stringify(auth)

    if ( path === 'verifyPassword') dispatch( verify( auth, jsonData, router ))
    else if( path === 'signupNewUser' ) {
        const validChars = /^[0-9a-zA-Z]+$/
        if ( auth.username.length < 4 )          return dispatch( loginError( 'Nickname to short!' ))
        if ( auth.username.length > 14 )         return dispatch( loginError( 'Nickname to long!' ))
        if ( !validChars.test(auth.username) )   return dispatch( loginError( 'Invalid characters!' ))

        fetch( 'http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then( res => res.json() )
        .then( res => {
            if( res.username === auth.username ) dispatch( verify( auth, jsonData, router ))
            else {
                const errors = Object.values( res ).flat()
                dispatch( loginError( errors ))
                dispatch( loginRefresh() )
            }
        })
    }
}

export const autoLogin = router => dispatch => {
    const refresh = localStorage.getItem('refresh')
    if( !refresh && router ) router.replace('/auth')
    else {
        fetch( 'http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh })
        })
        .then( res => res.json() )
        .then( res => {
            if( res.code === 'token_not_valid' && router ) router.replace('/auth')
            else if( res.access ) {
                dispatch( autoLoginResponse( res.access ))
                dispatch( loginRefresh() )
                if( router ) router.replace('/settings')
            }
        })
    }
}