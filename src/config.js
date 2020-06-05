import { mapValues } from 'lodash'

const isProduction = process.env.NODE_ENV === 'production'

const developmentUrl = 'http://127.0.0.1:8000'
const productionUrl = 'https://snake-rest-api.herokuapp.com'

const urls = {
    LOGIN: '/api/token/',
    CREATE_USER: '/api/users/',
    AUTO_LOGIN: '/api/token/refresh/',
    GET_GAMEMODES: '/api/gamemodes',
    GET_SCOREBOARD: '/api/scores?id=',
    POST_SCORE: '/api/scores'
}

export default mapValues( urls, val => isProduction ? productionUrl + val : developmentUrl + val )