import {Box} from '@chakra-ui/react';
import Layout from '../components/master-layout.js';
import {mainQuery, menuQuery} from '../lib/queries.js';
import SanityBlock from '../components/block-text-serializer.js';
import {fetchQuery} from '../lib/sanity.js';
import PropTypes from 'prop-types';
import {useFetchUser} from '../lib/user.js';

const Home = (props) => {
  const {user, loading} = useFetchUser();
  const {mainData} = props;
  return (
    <Layout user={user} loading={loading} {...props}>
      <Box as="h1" textStyle="h1">
        {mainData.heading}
      </Box>
      {user && <p>Welcome, {user.name}</p>}
      <SanityBlock blocks={mainData.mainText} />
    </Layout>
  );
};

// Amend below prop-types to be PropTypes.shape({...})
Home.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired
};

export async function getStaticProps({preview = false}) {
  const results = await fetchQuery(
    `{
      'mainData': ${mainQuery},
      'menuData': ${menuQuery}
    }`
  );

  return {
    props: {...results, preview}
  };
}

export default Home;
