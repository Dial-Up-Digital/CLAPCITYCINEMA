import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import TwitchStream from '../components/TwitchStream';
import mediaQueries from '../utils/constants';

export default function NowShowing({ isLive }) {
  useEffect(() => {
    if (!isLive) {
      window.location.href = '/';
    }
  });

  return (
    <Layout theme="dark" nowShowing>
      <NowShowing.Container>
        <NowShowing.Stream>
          <TwitchStream />
        </NowShowing.Stream>
      </NowShowing.Container>
    </Layout>
  );
}

NowShowing.propTypes = {
  isLive: PropTypes.bool,
};

NowShowing.defaultProps = {
  isLive: true,
};

NowShowing.Container = styled.div`
  display: flex;
  padding: 4rem;
  height: 100%;
  max-height: 37.5rem;

  @media ${mediaQueries.mobile} {
    align-items: center;
    box-sizing: border-box;
    padding: 2rem;
    max-height: none;
  }
`;

NowShowing.Stream = styled.div`
  flex-grow: 3;
  height: 100%;

  @media ${mediaQueries.chatBreakpoint} {
    margin: 0;
    width: 100%;
  }
`;

NowShowing.Chat = styled.div`
  flex-grow: 1;
  margin-left: 0.75rem;

  @media ${mediaQueries.chatBreakpoint} {
    display: none;
  }
`;

NowShowing.getInitialProps = async () => {
  let isLive;

  const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  await client
    .getEntries({
      content_type: 'streamInfo',
    })
    .then((res) => {
      isLive = [...res.items][0].fields.isLive;
    })
    .catch((error) => {
      console.log('\n Contentful fetch failed! \n', error);
      isLive = true;
    });

  return { isLive };
};
