import PropTypes from 'prop-types';
import {
  AccordionButton,
  Flex,
  Box,
  Heading,
  AccordionIcon,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';

const AccordionTop = ({percent, children}) => {
  const color =
    percent <= 25
      ? 'red.400'
      : percent >= 26 && percent <= 50
      ? 'orange.400'
      : percent >= 51 && percent <= 75
      ? 'yellow.400'
      : percent >= 76 && percent <= 91
      ? 'green.200'
      : percent >= 95
      ? 'green.400'
      : 'black.100';

  return (
    <AccordionButton>
      <Flex justify="space-between" w="100%">
        <Box>
          <Heading size="lg" as="h2" d="inline-block">
            {children}
          </Heading>
          <AccordionIcon css={{verticalAlign: 'text-bottom'}} />
        </Box>
        <CircularProgress value={percent} color={color} thickness="18px">
          <CircularProgressLabel color="black">
            {percent.toFixed(0)}%
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </AccordionButton>
  );
};

AccordionTop.propTypes = {
  children: PropTypes.any,
  percent: PropTypes.number
};

export default AccordionTop;
