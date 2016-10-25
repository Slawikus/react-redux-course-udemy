import {combineReducers,createStore} from 'redux';

const userReducer = function (state = {}, action) {
  switch (action.type) {
    case 'CHANGE_USER_NAME': {
      state = {...state, name: action.payload};
      break;
    }
    case 'CHANGE_USER_AGE': {
      state = {...state, age: action.payload};
      break;
    }
  }
  return state;
}

const postReducer = function (state = {}, action) {
  switch (action.type) {
    case 'NEW_POST': {
      return Object.assign({}, state, {
        post: [
          ...state,
          {
            title: action.payload.title,
            body: action.payload.body
          }
        ]
      });
    };
  }
  return state;
}

const reducers = combineReducers({
  user: userReducer,
  posts: postReducer
});

const store =  createStore(reducers);

store.subscribe( () => {
  console.log('Store changed:', store.getState());
});

store.dispatch({
  type: 'CHANGE_USER_NAME',
  payload: 'Bob'
});

store.dispatch({
  type: 'CHANGE_USER_AGE',
  payload: 40
});

store.dispatch({
  type: 'NEW_POST',
  payload: {
    title: 'Post title',
    body: 'This is a post body'
  }
});
