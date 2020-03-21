import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import reducers from './reducers'
const store = createStore(
    reducers,
    {}, // default state of the application
    compose(
        applyMiddleware(thunk, logger)
    ))
export default store;