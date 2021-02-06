import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import {Stack, Heading, Image, Text, Progress} from '@chakra-ui/react';

const ProjectPreview = ({project}) => {
  return (
    <Link
      passHref
      href={{
        pathname: '/form',
        query: {project: project.slug?.current}
      }}
    >
      <a>
        <Stack w="240px" align="center">
          <Heading isTruncated as="h3" maxW="240px" size="md">
            {project.ministry}
          </Heading>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={project.logo}
            alt={project.ministry}
            fallbackSrc="https://via.placeholder.com/200"
          />
          <Progress hasStripe w="100%" size="lg" value="60" />
          <Text>Status: awaiting input</Text>
        </Stack>
      </a>
    </Link>
  );
};

ProjectPreview.propTypes = {
  project: PropTypes.shape({
    logo: PropTypes.string,
    ministry: PropTypes.string,
    slug: PropTypes.shape({
      current: PropTypes.string
    })
  })
};

export default ProjectPreview;
