import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import mediaQueries from '../utils/constants';

function Header() {
  return (
    <Header.Container>
      <Link href="/">
        <Header.Logo src="/CCCLogo.png" alt="Clap City Cinema Logo" />
      </Link>
    </Header.Container>
  );
}

Header.Container = styled.div`
  display: flex;
  padding: 4rem 0 0 4rem;
  height: 5rem;
  align-items: center;

  @media ${mediaQueries.mobile} {
    padding: 2rem 0 0 0;
    justify-content: center;
  }
`;

Header.Logo = styled.img`
  position: relative;
  height: 100%;
  cursor: pointer;
  z-index: 3;

  @media ${mediaQueries.mobile} {
    height: auto;
    max-height: 100%;
    max-width: 70%;
  }
`;

export default Header;
