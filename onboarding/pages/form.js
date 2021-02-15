import Layout from '../components/master-layout.js';
import {menuQuery} from '../lib/queries.js';
import {fetchQuery} from '../lib/sanity.js';
import PropTypes from 'prop-types';
import Form from '../components/form/form.js';
import {useQuery} from 'react-query';
import {useRouter} from 'next/router';
import {uuid} from '@sanity/uuid';

function useProject(user) {
  const router = useRouter();
  const {project} = router.query;

  return useQuery(
    ['project', project],
    () => {
      return fetch(`/api/project/${project}`).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      });
    },
    {
      enabled: project !== 'new',
      placeholderData: {
        _id: uuid(),
        _type: 'project'
      }
    }
  );
}

const FormPage = (props) => {
  const query = useProject();

  return (
    <Layout wide {...props}>
      {query.isError && 'Error'}
      {query.isLoading && 'Loading'}
      {query.isSuccess && <Form sanityData={query.data} />}
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
