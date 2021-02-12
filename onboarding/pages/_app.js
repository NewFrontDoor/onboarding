import App from 'next/app';
import PropTypes from 'prop-types';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';

const queryClient = new QueryClient();

import theme from '../theme/index.js';

const cktheme = extendTheme(theme);

// Add any required typefaces here

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={cktheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    );
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired
};

export default MyApp;
