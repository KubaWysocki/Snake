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

const autoLoginFail = () => ({
    type: actionTypes.AUTO_LOGIN_FAIL
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

export const logout = router => {
    router.replace('/auth')
    localStorage.removeItem('refresh')
    return { type: actionTypes.LOGOUT }
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
        else dispatch( loginError( Object.entries( res ).map( el => el.join(': ')) ))
    })
}

export const login = ({ auth, path }, router) => dispatch => {
    dispatch( authStart() )
    const jsonData = JSON.stringify(auth)

    if ( path === 'verifyPassword') dispatch( verify( auth, jsonData, router ))
    else if( path === 'signupNewUser' ) {
        const errors = []
        const validChars = /^[0-9a-zA-Z]+$/
        if ( auth.username.length < 4 )         errors.push('Nickname to short!')
        else if ( auth.username.length > 14 )   errors.push('Nickname to long!')
        if ( !validChars.test(auth.username) )  errors.push('Invalid characters!')

        if( errors.length ) return dispatch( loginError( errors )) 

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
                const errors = Object.entries( res ).map( el => el.join(': '))
                dispatch( loginError( errors ))
                dispatch( loginRefresh() )
            }
        })
    }
}

export const autoLogin = router => dispatch => {
    if( router.location ) var enteredPath = router.location.pathname
    router.replace('/')
    
    const refresh = localStorage.getItem('refresh')
    if( !refresh && router ) {
        dispatch( autoLoginFail())
        router.replace('/auth')
    }
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
            if( res.code === 'token_not_valid' && router ) {
                dispatch( autoLoginFail())
                router.replace('/auth')
            }
            else if( res.access ) {
                dispatch( autoLoginResponse( res.access ))
                dispatch( loginRefresh() )
                const redirectToSettings = enteredPath === '/' || enteredPath === '/game' || enteredPath === '/auth'
                if( router.location && redirectToSettings ) router.replace('/settings')
                else router.replace( enteredPath )
            }
        })
        .catch(() => {
            dispatch( autoLoginFail())
            router.replace('/auth')
        })
    }
}