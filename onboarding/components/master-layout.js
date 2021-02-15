import PropTypes from 'prop-types';
import NavBar from './header/header.js';
import Head from 'next/head';
import {Box} from '@chakra-ui/react';
import {useQuery} from 'react-query';

function getUser() {
  return fetch('/api/me').then((response) => {
    if (response.ok) return response.json();
  });
}

const Layout = ({mainData, wide, menuData, children}) => {
  const query = useQuery('user', getUser);

  return (
    <div>
      <Head>
        <title>{mainData?.heading || mainData?.ministry || 'Welcome'}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <NavBar user={query.data} items={menuData?.menuitems} />
      <Box as="article" maxW={wide ? '1400px' : '700px'} m="auto" p="15px">
        {children}
      </Box>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.shape({
    menuitems: PropTypes.arrayOf(PropTypes.object)
  })
};

export default Layout;
