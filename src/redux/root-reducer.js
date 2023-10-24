import {combineReducers} from 'redux'

import quantityReducer from './quantity/reducer'

const rootReducer = combineReducers({quantityReducer})

export default rootReducer