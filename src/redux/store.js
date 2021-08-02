import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import {galleryReducers} from './gallery/reducers' 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
  
const enhancer = composeEnhancers(applyMiddleware(
    thunk 
  ));

const rootReducer = combineReducers({
    gallery: galleryReducers,
});
 

const store = createStore(
  rootReducer, 
  {},
  enhancer
);

export default store;