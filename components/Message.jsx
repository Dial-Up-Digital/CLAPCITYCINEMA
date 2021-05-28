import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Message({ username, timestamp, text }) {
  return (
    <div>
      <Message.Time>{timestamp}</Message.Time>
      <Message.Bubble>
        <Message.User>
          <span>{username}</span>
        </Message.User>
        <br />
        <Message.Text>{text}</Message.Text>
      </Message.Bubble>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  username: PropTypes.string,
  timestamp: PropTypes.string,
};

Message.defaultProps = {
  username: 'user',
  timestamp: '4:00PM',
};

Message.Bubble = styled.div`
  display: inline-block;
  border-radius: 5px;
  background-color: #50e3c2;
  color: white;
  min-height: 60px;
  max-width: 400px;
  margin: 20px 0px 0px 10px;
  padding: 5px 10px 5px 10px;
`;

Message.Time = styled.div`
  color: #9b9b9b;
  margin: 0px 10px;
  vertical-align: middle;
  display: inline-block;
`;

Message.Text = styled.div`
  display: inline-block;
  clear: both;
  word-wrap: break-word;
  width: 100%;
`;

Message.User = styled(Message.Text)`
  font-weight: bold;
`;

export default Message;
