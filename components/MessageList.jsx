import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Message from './Message';

function MessageList() {
  const ref = useRef(null);
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    const { scrollTop, scrollHeight } = ref.current;
    if (scrollTop !== scrollHeight) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MessageList.Container ref={ref}>
      <MessageList.Messages>
        {messages.map((message) => (
          <Message text={message.text} key={message} />
        ))}
      </MessageList.Messages>
    </MessageList.Container>
  );
}

MessageList.Container = styled.div`
  display: flex;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  flex: 1;
  align-items: flex-end;
  scrollbar-width: none;
  padding: 0px 30px;
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

MessageList.Messages = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

export default MessageList;
