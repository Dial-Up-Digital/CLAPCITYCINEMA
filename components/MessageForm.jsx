import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../state/actions';

function MessageForm({ socket }) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.chat.username);
  const [inputText, setInputText] = useState('');

  const resetInputText = () => setInputText('');

  const onMessageChange = (e) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.sendMessage(socket, username, inputText, 'blue'));
    resetInputText();
  };

  return (
    <MessageForm.Container>
      <MessageForm.Form onSubmit={onSubmit}>
        <MessageForm.Input onChange={onMessageChange} value={inputText} autoComplete="off" />
      </MessageForm.Form>
    </MessageForm.Container>
  );
}

MessageForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  socket: PropTypes.any.isRequired,
};

MessageForm.Container = styled.div`
  padding: 10px;
`;

MessageForm.Form = styled.form`
  width: 100%;
  display: flex;
`;

MessageForm.Input = styled.input`
  border-radius: 5px;
  border: 1px #979797;
  border-style: solid;
  border-width: 1px;
  margin: 0;
  appearance: none;
  box-shadow: none;
  border-radius: none;
  padding-left: 5px;
  width: 100%;

  &:focus,
  textarea:focus {
    outline: none;
  }
`;

export default MessageForm;
