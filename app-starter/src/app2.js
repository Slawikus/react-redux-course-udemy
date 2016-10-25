import {applyMiddleware, createStore} from 'redux';
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = {
  fetching: false,
  fetched: false,
  posts: [],
  error: null
};

const reducer = function(state = initialState, action){
  switch (action.type) {
    case 'FETCH_POSTS_START': {
      return {...state, fetching: true};
      break;
    }
    case 'FETCH_POSTS_ERROR' : {
      return {...state, fetching: false, error: action.payload};
      break;
    }
    case 'GOT_POSTS': {
      return {...state, fetching: false, fetched: true, posts: action.payload};
    }
  }
  return state;
}

const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducer, middleware);

store.dispatch(function(dispatch){
  dispatch({
    type: 'FETCH_POSTS_START'
  });
  axios.get('http://jsonplaceholder.typicode.com/posts')
  .then(function(response){
    dispatch({
      type: 'GOT_POSTS',
      payload: response.data
    });
  }).catch(function(err){
    dispatch({
      type: 'FETCH_POSTS_ERROR',
      payload: err
    });
  });
});
