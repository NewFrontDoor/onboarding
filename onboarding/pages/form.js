import {findOrCreate} from '../lib/user.js';
import auth0 from '../lib/auth0.js';
import Layout from '../components/master-layout.js';
import {menuQuery, formQuery} from '../lib/queries.js';
import {fetchQuery} from '../lib/sanity.js';
import PropTypes from 'prop-types';
import Form from '../components/form/form.js';

const FormPage = (props) => {
  const {mainData, user} = props;

  return (
    <Layout user={user} {...props}>
      <Form sanityData={mainData} />
    </Layout>
  );
};

// Amend below prop-types to be PropTypes.shape({...})
FormPage.propTypes = {
  mainData: PropTypes.object.isRequired,
  menuData: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export async function getServerSideProps({req, res, query}) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/login'
    });
    res.end();
    return;
  }

  const userData = await findOrCreate(session.user);

  const results = await fetchQuery(
    `{
      'mainData': ${formQuery(query.project)},
      'menuData': ${menuQuery}
    }`
  );

  if (!results.mainData) {
    return {
      notFound: true
    };
  }

  if (
    results.mainData.owner !== session.user.email &&
    results.mainData.authorisedAccounts.includes(session.user.email) !== true
  ) {
    return {
      notFound: true
    };
  }

  const newMainData = (({owner, ...o}) => o)(results.mainData);
  newMainData.isOwner = results.mainData.owner === session.user.email;

  return {
    props: {
      user: session.user,
      mainData: newMainData,
      menuData: results.menuData,
      userData
    }
  };
}

export default FormPage;
