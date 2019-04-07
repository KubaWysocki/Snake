import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import gameReducer from './Store/reducers/gameReducer'
import authReducer from './Store/reducers/authReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    game: gameReducer,
    auth: authReducer
})

const store = createStore( rootReducer, composeEnhancers( applyMiddleware( thunk )))

const app = (
    <Provider store={ store }>
        <BrowserRouter basename={ process.env.PUBLIC_URL }>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render( app, document.getElementById('root'))
serviceWorker.unregister();
