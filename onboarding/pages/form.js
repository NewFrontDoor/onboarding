import Layout from '../components/master-layout.js';
import {menuQuery} from '../lib/queries.js';
import {fetchQuery} from '../lib/sanity.js';
import PropTypes from 'prop-types';
import Form from '../components/form/form.js';

const FormPage = (props) => {
  return (
    <Layout wide {...props}>
      <Form />
    </Layout>
  );
};

// Amend below prop-types to be PropTypes.shape({...})
FormPage.propTypes = {
  menuData: PropTypes.object.isRequired
};

export async function getStaticProps() {
  const results = await fetchQuery(
    `{
      'menuData': ${menuQuery}
    }`
  );

  return {
    props: {
      menuData: results.menuData
    }
  };
}

export default FormPage;
