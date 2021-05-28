import * as actionTypes from './actionTypes';

export const initialize = ({ users, messages, name, color }) => (dispatch) => {
  // Set Users
  // Set Messages
  // Set Name

  const initialMessage = {
    user: 'DIAL UP BOT',
    text:
      "WELCOME TO THE DIAL UP RADIO CHATROOM. I'M ONLY GONNA SAY THIS ONCE SO FUCKING LISTEN. TYPE /setname __________ TO CHANGE YOUR NAME TO __________.\nTYPE /setcolor __________ TO CHANGE YOUR MESSAGE BUBBLE COLOR TO __________. \nIF YOU REALLY NEED ME TO REPEAT THIS TYPE /help (THOUGH THIS SHIT REALLY ISN'T THAT HARD GOD DAMN)",
    color,
    timestamp: Date.now(),
  };

  console.log('INITIALIZE ACTION');

  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    message: initialMessage,
  });
};

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = (socketInstance, user, text, color) => (dispatch) => {
  const message = {
    user,
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

export const userJoined = ({ userName, color }) => (dispatch) => {
  const userJoinedMessage = {
    user: 'DIAL UP BOT',
    text: userName + ' Joined',
    color,
    timestamp: Date.now(),
  };

  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    userJoinedMessage,
  });
};

export const userLeft = ({ userName, color }) => (dispatch) => {
  const userLeftMessage = {
    user: 'DIAL UP BOT',
    text: userName + ' Left',
    color,
    timestamp: Date.now(),
  };

  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    userLeftMessage,
  });
};
