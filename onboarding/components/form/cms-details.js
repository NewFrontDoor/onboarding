import React, {useEffect, useState} from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  InputRightAddon,
  InputGroup,
  IconButton,
  UnorderedList,
  Button
} from '@chakra-ui/react';
import {MdDelete} from 'react-icons/md';
import {useFormContext, useFieldArray, Controller} from 'react-hook-form';
import {uuid} from '@sanity/uuid';

const CMSDetails = () => {
  const {control, register, errors} = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name: 'additional_cms'
  });

  const cms = [
    {name: 'Elvanto', value: 'elvanto'},
    {name: 'Church Community Builder', value: 'ccb'},
    {name: 'Planning Center', value: 'planning_center'},
    {name: 'Tithely', value: 'tithely'},
    {name: 'Jethro', value: 'jethro'},
    {name: 'Yet to decide', value: 'yet-to-decide'}
  ];

  return (
    <FormControl as="fieldset" isInvalid={errors.name} variant="project">
      <FormLabel as="legend">Church Management System(s) used</FormLabel>
      <SimpleGrid columns={2} spacing={2} marginBottom="4">
        <Controller
          control={control}
          name="cms"
          render={(
            {onChange, value, defaultValue},
            {invalid, isTouched, isDirty}
          ) => (
            <CheckboxGroup
              value={value}
              defaultValue={defaultValue}
              onChange={(value) => onChange(value)}
            >
              {cms.map((item) => (
                <Checkbox
                  key={item.value}
                  name={`cms.${item.value}`}
                  value={item.value}
                >
                  {item.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        />
      </SimpleGrid>
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
              name={`additional_cms[${index}]._key`}
              defaultValue={item._key}
              type="hidden"
            />
            <InputGroup>
              <Input
                ref={register()}
                name={`additional_cms[${index}].cms`}
                defaultValue={item.cms} // Make sure to set up defaultValue
                type="text"
                borderLeftRadius="0"
                placeholder="My"
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
          append({_key: uuid(), cms: 'My CMS'});
        }}
      >
        Add a different platform
      </Button>
    </FormControl>
  );
};

export default CMSDetails;
