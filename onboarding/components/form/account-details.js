import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  IconButton,
  UnorderedList,
  Button,
  Checkbox,
  Flex,
  Spacer
} from '@chakra-ui/react';
import {useFormContext, useFieldArray} from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import {uuid} from '@sanity/uuid';

const AccountDetails = () => {
  const {register, errors} = useFormContext();

  const {fields, append, remove} = useFieldArray({
    name: 'accounts'
  });

  return (
    <FormControl as="fieldset" isInvalid={errors.name} variant="project">
      <FormLabel as="legend">User accounts</FormLabel>
      <UnorderedList
        styleType="none"
        spacing={2}
        marginLeft={0}
        marginBottom={4}
      >
        {fields.map((item, index) => (
          <li key={item.id}>
            <Flex>
              <input
                ref={register()}
                name={`accounts[${index}]._key`}
                defaultValue={item._key}
                type="hidden"
              />
              <Checkbox
                ref={register()}
                name={`accounts[${index}].admin_access`}
                defaultValue={item.admin_access} // Make sure to set up defaultValue
              >
                Admin
              </Checkbox>
              <Spacer />
              <Input
                ref={register()}
                w="250px"
                placeholder="First name"
                name={`accounts[${index}].first_name`}
                defaultValue={item.first_name} // Make sure to set up defaultValue
                type="text"
                borderLeftRadius="0"
              />
              <Spacer />
              <Input
                ref={register()}
                w="250px"
                placeholder="Surname"
                name={`accounts[${index}].second_name`}
                defaultValue={item.second_name} // Make sure to set up defaultValue
                type="text"
                borderLeftRadius="0"
              />
              <Spacer />
              <IconButton
                icon={<MdDelete />}
                name="remove"
                onClick={() => remove(index)}
              />
            </Flex>
          </li>
        ))}
      </UnorderedList>

      <Button
        type="button"
        onClick={() => {
          append({
            _key: uuid(),
            first_name: '',
            second_name: '',
            admin_access: false
          });
        }}
      >
        Add another user
      </Button>
    </FormControl>
  );
};

export default AccountDetails;
