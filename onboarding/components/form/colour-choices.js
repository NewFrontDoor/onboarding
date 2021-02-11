import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  IconButton,
  UnorderedList,
  Button,
  Select,
  Spacer,
  Flex
} from '@chakra-ui/react';
import {useFormContext, useFieldArray} from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import {uuid} from '@sanity/uuid';

const ColourChoices = () => {
  const {register, errors} = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name: 'colour_scheme'
  });

  return (
    <FormControl isInvalid={errors.name} variant="project">
      <FormLabel as="legend">Colour Scheme</FormLabel>
      <UnorderedList
        styleType="none"
        spacing={2}
        marginLeft={0}
        marginBottom={4}
      >
        {fields.map((item, index) => (
          <li key={item.id}>
            <input
              ref={register()}
              name={`colour_scheme[${index}]._key`}
              defaultValue={item._key}
              type="hidden"
            />

            <InputGroup>
              <InputLeftAddon>#</InputLeftAddon>
              <Input
                ref={register()}
                type="text"
                borderLeftRadius="0"
                name={`colour_scheme[${index}].colour`}
                defaultValue={item.colour}
              />

              <Select
                ref={register()}
                name={`colour_scheme[${index}].function`}
              >
                <option selected value="primary">
                  Primary
                </option>
                <option value="secondary">Secondary</option>
                <option value="highlight">Highlight</option>
                <option value="lowlight">Lowlight</option>
                <option value="text">Text</option>
              </Select>

              <IconButton
                icon={<MdDelete />}
                name="remove"
                onClick={() => remove(index)}
              />
            </InputGroup>
          </li>
        ))}
      </UnorderedList>

      <Button
        type="button"
        onClick={() => {
          append({_key: uuid(), colour: 'ffffff', function: 'primary'});
        }}
      >
        Add another colour
      </Button>
    </FormControl>
  );
};

export default ColourChoices;
