import * as actionTypes from './actionTypes';

export const initialize = ({ users, messages, username, color }) => (dispatch) => {
  // Set Users
  // Set Messages
  // Set Name

  const initialMessage = {
    username: 'DIAL UP BOT',
    text:
      "WELCOME TO THE DIAL UP RADIO CHATROOM. I'M ONLY GONNA SAY THIS ONCE SO FUCKING LISTEN. TYPE /setname __________ TO CHANGE YOUR NAME TO __________.\nTYPE /setcolor __________ TO CHANGE YOUR MESSAGE BUBBLE COLOR TO __________. \nIF YOU REALLY NEED ME TO REPEAT THIS TYPE /help (THOUGH THIS SHIT REALLY ISN'T THAT HARD GOD DAMN)",
    color,
    timestamp: Date.now(),
  };

  console.log('INITIALIZE ACTION', username);

  dispatch({
    type: actionTypes.SET_USERNAME,
    username,
  });

  dispatch({
    type: actionTypes.SET_USERS,
    users,
  });

  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    message: initialMessage,
  });
};

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = (socketInstance, username, text, color) => (dispatch) => {
  const message = {
    username,
    text,
    color,
    timestamp: Date.now(),
  };

  socketInstance.emit('send:message', message);

  return dispatch({
    type: actionTypes.SEND_MESSAGE,
    message,
  });
};

export const receivedMessage = (message) => (dispatch) =>
  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    message,
  });

export const userJoined = ({ username, users }) => (dispatch) => {
  const userJoinedMessage = {
    username: 'DIAL UP BOT',
    text: username + ' Joined',
    color: '#d3d3d3',
    timestamp: Date.now(),
  };

  dispatch({
    type: actionTypes.SET_USERS,
    users,
  });

  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    message: userJoinedMessage,
  });
};

export const userLeft = ({ username, users }) => (dispatch) => {
  const userLeftMessage = {
    username: 'DIAL UP BOT',
    text: username + ' Left',
    color: '#d3d3d3',
    timestamp: Date.now(),
  };

  dispatch({
    type: actionTypes.SET_USERS,
    users,
  });

  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    message: userLeftMessage,
  });
};
