import React from 'react';
import {ReactComponent as Logo} from '../../public/logo-horizontal.svg';
import {Box, Flex, Button, Stack} from '@chakra-ui/react';
import MenuItem from './menuitem';

const NavBar = ({user, ...props}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Box w="300px">
        <Logo />
      </Box>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks user={user} isOpen={isOpen} items={props.items} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="black"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({toggle, isOpen}) => {
  return (
    <Box display={{base: 'block', md: 'none'}} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuLinks = ({user, isOpen, items}) => {
  return (
    <Box
      display={{base: isOpen ? 'block' : 'none', md: 'block'}}
      flexBasis={{base: '100%', md: 'auto'}}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {items &&
          items.map((item) => (
            <MenuItem key={item.text} to={item.childpages[0].url}>
              {item.text}
            </MenuItem>
          ))}
        {user && <MenuItem to="/account">Account</MenuItem>}
        {user ? (
          <MenuItem to="/api/logout">Log out</MenuItem>
        ) : (
          <MenuItem to="/api/login">Log in</MenuItem>
        )}
        <MenuItem isLast to="/signup">
          <Button
            size="sm"
            rounded="md"
            color="black"
            bg="white"
            _hover={{
              bg: ['#00ff00', '#00ff00', '#00ff00', '#00ff00']
            }}
          >
            Create Account
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({children, ...props}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
