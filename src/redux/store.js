import ChoosingPageReducer from './reducers/ChoosingPage';
import ResultPageReducer from './reducers/ResultPage';
import MainPageReducer from './reducers/MainPage';
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({ChoosingPageReducer, ResultPageReducer, MainPageReducer});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;