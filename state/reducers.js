import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import * as actionTypes from './actionTypes';
import initialState from './initialState';

const chatReducer = (state = initialState.chat, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.chat };
    case actionTypes.SET_USERNAME:
      return { ...state, username: action.username };
    case actionTypes.SET_USERS:
      return { ...state, users: action.users };
    case actionTypes.SEND_MESSAGE:
    case actionTypes.RECEIVED_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  chat: chatReducer,
});

export default rootReducer;
