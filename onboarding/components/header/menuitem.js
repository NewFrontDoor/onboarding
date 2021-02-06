import React from 'react';
import PropTypes from 'prop-types';

import {Link, Text} from '@chakra-ui/react';

const MenuItem = ({children, isLast, to = '/', ...rest}) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

MenuItem.propTypes = {
  children: PropTypes.node,
  isLast: PropTypes.bool,
  to: PropTypes.string
};

export default MenuItem;
