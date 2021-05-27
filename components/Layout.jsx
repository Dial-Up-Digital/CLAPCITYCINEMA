import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { initGA, logPageView } from '../utils/analytics';

const themeTypes = {
  LIGHT: 'light',
  DARK: 'dark',
};

class Layout extends PureComponent {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }

    logPageView();
  }

  render() {
    const { children, theme, nowShowing, isMobile } = this.props;
    return (
      <div className="page">
        <Header isMobile={isMobile} />
        <div className="body">{children}</div>
        <style jsx global>
          {`
            html {
              position: relative;
            }

            html,
            body,
            #__next {
              height: 100%;
              width: 100%;
              margin: 0px !important;
              background-color: ${theme === themeTypes.LIGHT ? '#fff' : '#1F1F1F'};
            }

            .page {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              flex: 1 1 auto;
              background: ${nowShowing ? '#1b1b1b' : 'url("/CCCbkg.png")'};
            }

            .body {
              flex-grow: 1;
              z-index: 1;
            }

            .header {
              z-index: 2;
            }
          `}
        </style>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
};

Layout.defaultProps = {
  theme: 'light',
};

export default Layout;
