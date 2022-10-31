import CityReducer from '../CityReducer/CityReducer'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware } from 'redux'
import MiddleReSa from '../Saga/MiddleResa'
import ContentReducer from '../CityReducer/ContentReducer'

var redux = require("redux")
const sagaMiddleware = createSagaMiddleware()

const allReducer = redux.combineReducers({
    city: CityReducer,
    content: ContentReducer
})

export default redux.createStore(
    allReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(MiddleReSa) 