import React from 'react';
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
    <AccordionButton _expanded={{ color: "green" }}>
      <Flex justify="space-between" w="100%">
        <Box>
          <Heading textStyle="h2" d="inline-block">
            {children}
          </Heading>
          <AccordionIcon css={{verticalAlign: 'text-bottom'}} />
        </Box>
        <CircularProgress value={percent} color={color} thickness="18px">
          <CircularProgressLabel>{percent.toFixed(0)}%</CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </AccordionButton>
  );
};

export default AccordionTop;
