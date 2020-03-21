export const gameModeToQueryString = gameMode =>
    Object.entries( gameMode ).map( q => q.join('=') ).join('&')

export const querryStringToGameMode = qs => {
    const gameMode = Object.fromEntries( qs.substring(1).split('&').map( q => q.split('=')))
    for( const key in gameMode ){
        if( gameMode[key] === 'true' ) gameMode[key] = true
        if( gameMode[key] === 'false' ) gameMode[key] = false
        if( /^(80|160|240)$/.test(gameMode[key]) ) gameMode[key] = Number( gameMode[key] )
    }
    return gameMode
}