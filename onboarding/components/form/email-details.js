import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  InputGroup,
  InputRightAddon,
  IconButton,
  SimpleGrid,
  UnorderedList,
  Button
} from '@chakra-ui/react';
import {useFormContext, useFieldArray, Controller} from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import {uuid} from '@sanity/uuid';

const EmailDetails = () => {
  const {control, register, errors, getValues} = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name: 'additional_alias'
  });

  const site = getValues('website_url')?.replace('www.', '') || 'example.com';

  const alias = [
    'minister',
    'pastor',
    'contact',
    'info',
    'bom',
    'elders',
    'deacons',
    'secretary',
    'treasurer',
    'pc',
    'committee',
    'welcoming',
    'youth'
  ];

  return (
    <FormControl as="fieldset" isInvalid={errors.name} variant="project">
      <FormLabel as="legend">Mailing lists/aliases</FormLabel>
      <SimpleGrid columns={2} spacing={2} marginBottom={4}>
        <Controller
          control={control}
          name="alias"
          render={(
            {onChange, value, defaultValue},
            {invalid, isTouched, isDirty}
          ) => (
            <CheckboxGroup
              value={value}
              defaultValue={defaultValue}
              onChange={(value) => onChange(value)}
            >
              {alias.map((item) => (
                <Checkbox key={item} name={`alias.${item}`} value={item}>
                  {`${item}@${site}`}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        />
      </SimpleGrid>
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
              name={`additional_alias[${index}]._key`}
              defaultValue={item._key}
              type="hidden"
            />
            <InputGroup>
              <Input
                ref={register()}
                name={`additional_alias[${index}].alias`}
                defaultValue={item.alias} // Make sure to set up defaultValue
                type="text"
                borderLeftRadius="0"
                placeholder="Add alias"
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
          append({_key: uuid(), alias: ''});
        }}
      >
        Add another email alias
      </Button>
    </FormControl>
  );
};

export default EmailDetails;
