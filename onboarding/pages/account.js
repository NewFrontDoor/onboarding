import PropTypes from 'prop-types';
import auth0 from '../lib/auth0.js';
import Layout from '../components/master-layout.js';
import ProjectPreview from '../components/project-preview.js';
import {menuQuery} from '../lib/queries.js';
import {fetchQuery} from '../lib/sanity.js';
import {findOrCreate} from '../lib/user.js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Grid,
  Text,
  Heading
} from '@chakra-ui/react';
import Link from 'next/link';

const Account = ({userData, menuData}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Layout menuData={menuData}>
        <Heading as="h1" size="2xl">
          My Account
        </Heading>
        <Heading as="h2" size="xl">
          Projects I own
        </Heading>
        {userData.owner ? (
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {userData.owner.map((project) => (
              <ProjectPreview key={project.id} project={project} />
            ))}
          </Grid>
        ) : (
          <div>
            <Text>You don‘t own any projects.</Text>
          </div>
        )}
        <Link href="/form?project=new">Start a new project now</Link>
        <Heading as="h2" size="xl">
          Projects I contribute to
        </Heading>
        {userData.contributor ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {userData.contributor.map((project) => (
              <ProjectPreview key={project.id} project={project} />
            ))}
          </Grid>
        ) : (
          <Text>
            You aren‘t listed as a contributor on any projects yet. Ask the
            project owner to add your email to the list of contributors to get
            going.
          </Text>
        )}
      </Layout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This is the body text</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

Account.propTypes = {
  menuData: PropTypes.object,
  user: PropTypes.object,
  userData: PropTypes.shape({
    contributor: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.arrayOf(PropTypes.object)
  })
};

export async function getServerSideProps({req, res}) {
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

  const user = await findOrCreate(session.user);

  const results = await fetchQuery(
    `{
      'menuData': ${menuQuery}
    }`
  );

  if (!results) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      menuData: results.menuData,
      userData: user
    }
  };
}

export default Account;
