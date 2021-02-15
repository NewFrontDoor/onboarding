import PropTypes from 'prop-types';
import React, {useState, useLayoutEffect, useRef} from 'react';
import {
  Box,
  Heading,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  FormLabel,
  FormControl,
  UnorderedList,
  IconButton,
  InputRightAddon
} from '@chakra-ui/react';
import {useFormContext, useFieldArray} from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import pagemap from 'pagemap';
import {uuid} from '@sanity/uuid';

const ControlBox = ({isOwner, isLoading, formState, reset, initialData}) => {
  const inputElement = useRef(null);
  const [mapShowing, setMapShowing] = useState(false);

  const {register, errors} = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name: 'authorisedAccounts'
  });

  useLayoutEffect(() => {
    if (!mapShowing) {
      pagemap(inputElement.current, {
        viewport: null,
        styles: {
          'header,footer,section,article': 'rgba(0, 0, 0, 0.08)',
          'h1,a': 'rgba(0, 0, 0, 0.10)',
          'h2,h3,h4': 'rgba(0, 0, 0, 0.08)'
        },
        back: 'rgba(0, 0, 0, 0.02)',
        view: 'rgba(0, 0, 0, 0.05)',
        drag: 'rgba(0, 0, 0, 0.10)',
        interval: null
      });
      setMapShowing(true);
    }
  }, [mapShowing, setMapShowing]);

  return (
    <Box>
      <Box
        sx={{position: 'sticky'}}
        top="100px"
        border="2px"
        p="20px"
        borderRadius="10px"
      >
        <Heading size="lg">Controls</Heading>
        <Heading size="md">Mini map</Heading>
        <Box h="200px">
          <Box
            ref={inputElement}
            as="canvas"
            style={{height: '100%', width: '300px', margin: 'auto'}}
          />
        </Box>
        {isOwner && (
          <FormControl isInvalid={errors.name} variant="project">
            <FormLabel as="legend">Verified editors</FormLabel>
            <p>Add email addresses below</p>
            <UnorderedList
              styleType="none"
              spacing="2"
              marginLeft="0"
              marginBottom="4"
            >
              {fields.map((item, index) => (
                <li key={item.id}>
                  <input
                    ref={register()}
                    name={`authorisedAccounts[${index}]._key`}
                    defaultValue={item._key}
                    type="hidden"
                  />
                  <InputGroup>
                    <Input
                      ref={register()}
                      name={`authorisedAccounts[${index}].email`}
                      defaultValue={item.email}
                      type="text"
                      placeholder="Add email address"
                    />
                    <InputRightAddon>
                      <IconButton
                        icon={<MdDelete />}
                        name="remove"
                        onClick={() => remove(index)}
                      />
                    </InputRightAddon>
                  </InputGroup>
                </li>
              ))}
            </UnorderedList>

            <Button
              type="button"
              onClick={() => {
                append({_key: uuid(), email: ''});
              }}
            >
              Add another email
            </Button>
          </FormControl>
        )}
        <br />
        <ButtonGroup variant="outline" spacing="6">
          <Button
            isDisabled={!formState.isDirty}
            isLoading={isLoading}
            loadingText="Loading"
            type="submit"
          >
            Submit
          </Button>
          <Button
            isDisabled={!formState.isDirty}
            onClick={() =>
              reset(
                {...initialData},
                {
                  errors: false,
                  dirtyFields: false,
                  isDirty: false,
                  isSubmitted: false
                }
              )
            }
          >
            Revert
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

ControlBox.propTypes = {
  formState: PropTypes.shape({
    isDirty: PropTypes.bool
  }),
  initialData: PropTypes.object,
  isOwner: PropTypes.bool,
  isLoading: PropTypes.bool,
  reset: PropTypes.func
};

export default ControlBox;
