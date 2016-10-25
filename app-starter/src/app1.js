import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

const reducer = function(state = 0, action) {
  if (action.type === 'INC') {
    return state + 1;
  } else if (action.type === 'DEC') {
    return state - 1;
  } /* else if (action.type === 'ERR') {
    throw new Error('Some error');
  } */
}

/*
const logger = (store) => (next) => (action) => {
  console.log('action triggered', action);
  // action.type = 'DEC';
  next(action);
}

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.log('ERROR: ', e);
  }
}
*/

const middleware = applyMiddleware(logger());

const store =  createStore(reducer, 1, middleware);

store.subscribe( () => {
  console.log('Store changed:', store.getState());
});

store.dispatch({
  type: 'INC'
});

store.dispatch({
  type: 'INC'
});

store.dispatch({
  type: 'DEC'
});

// store.dispatch({
//   type: 'ERR'
// });
