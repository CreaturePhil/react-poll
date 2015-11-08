import { combineReducers } from 'redux'
import counter from './counter'
import {visibilityFilter, todos} from './todos';

const rootReducer = combineReducers({
  counter,
  visibilityFilter,
  todos
})

export default rootReducer
