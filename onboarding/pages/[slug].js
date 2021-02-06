import Layout from '../components/master-layout.js';
import {menuQuery, pageQuery} from '../lib/queries.js';
import SanityBlock from '../components/block-text-serializer.js';
import {fetchQuery} from '../lib/sanity.js';
import PropTypes from 'prop-types';
import {Box} from '@chakra-ui/react';

const Page = (props) => {
  const {mainData} = props;

  return (
    <Layout {...props}>
      <Box as="h1" textStyle="h1" sx={{textAlign: 'left'}}>
        {mainData.title}
      </Box>
      <SanityBlock blocks={mainData.body} />
    </Layout>
  );
};

// Amend below prop-types to be PropTypes.shape({...})
Page.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

Page.getInitialProps = async ({query}) => {
  const results = await fetchQuery(
    `{
        "mainData": ${pageQuery(query.slug)},
        "menuData": ${menuQuery}
    }`
  );
  return results;
};

export default Page;
