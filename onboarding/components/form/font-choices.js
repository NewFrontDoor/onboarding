import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  IconButton,
  UnorderedList,
  Button,
  Select,
  InputGroup,
  Flex,
  Spacer
} from '@chakra-ui/react';
import {useFormContext, useFieldArray} from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import {uuid} from '@sanity/uuid';

const FontChoices = () => {
  const {register, errors} = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name: 'font_choices'
  });

  return (
    <FormControl isInvalid={errors.name} variant="project">
      <FormLabel as="legend">Font choices</FormLabel>
      <UnorderedList
        styleType="none"
        spacing="2"
        marginLeft="0"
        marginBottom="4"
      >
        {fields.map((item, index) => (
          <li key={item.id}>
            <Flex>
              <input
                ref={register()}
                name={`font_choices[${index}]._key`}
                defaultValue={item._key}
                type="hidden"
              />
              <InputGroup>
                <Input
                  ref={register()}
                  w="40%"
                  name={`font_choices[${index}].font`}
                  defaultValue={item.font}
                  type="text"
                  placeholder="Add font"
                />
                <Spacer />
                <Select
                  ref={register()}
                  w="40%"
                  name={`font_choices[${index}].function`}
                >
                  <option selected value="body">
                    Body
                  </option>
                  <option value="heading-1">Heading 1</option>
                  <option value="heading-2">Heading 2</option>
                  <option value="special">Special</option>
                </Select>
                <Spacer />
                <IconButton
                  icon={<MdDelete />}
                  name="remove"
                  onClick={() => remove(index)}
                />
              </InputGroup>
            </Flex>
          </li>
        ))}
      </UnorderedList>

      <Button
        type="button"
        onClick={() => {
          append({_key: uuid(), font: '', function: 'body'});
        }}
      >
        Add another font
      </Button>
    </FormControl>
  );
};

export default FontChoices;
