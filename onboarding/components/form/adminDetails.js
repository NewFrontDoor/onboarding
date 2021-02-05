import React, {useEffect, useState} from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  InputGroup,
  InputRightAddon,
  IconButton,
  Select,
  SimpleGrid,
  AccordionPanel
} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import FileInput from './fileInput.js';
import FieldArray from './fieldArray.js';
import AccordionTop from './accordion-top.js';

const AdminDetails = () => {
  const [percent, setPercent] = useState();

  const {
    register,
    unregister,
    errors,
    setValue,
    getValues,
    watch,
    control
  } = useFormContext();

  const site = getValues('website_url')?.replace('www.', '') || 'example.com';

  const wfields = watch(['structure', 'church_management_system']);

  useEffect(() => {
    const entries = Object.values(wfields).filter((v) => v).length;
    setPercent((entries / 2) * 100);
  }, [wfields]);

  return (
    <div>
      <AccordionTop percent={percent || 0}>
        Office 365 and Administrative
      </AccordionTop>
      <AccordionPanel pb={4}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Church Management System(s) used</FormLabel>
          <SimpleGrid columns={2} spacing={2}>
            <Checkbox ref={register} name="cms-elvanto">
              Elvanto
            </Checkbox>
            <Checkbox ref={register} name="cms-ccb">
              Church Community Builder
            </Checkbox>
            <Checkbox ref={register} name="cms-planning_center">
              Planning Center
            </Checkbox>
            <Checkbox ref={register} name="cms-tithely">
              Tithely
            </Checkbox>
          </SimpleGrid>
          <FieldArray
            add="Add cms"
            identifier="additional_cms"
            Item={({item, remove, index}) => (
              <InputGroup key={item.id}>
                <Input
                  ref={register()}
                  type="text"
                  borderLeftRadius="0"
                  name={`additional_cms.items[${index}]`}
                />
                <InputRightAddon>
                  <IconButton
                    icon={<MdDelete />}
                    name="remove"
                    onClick={() => remove(index)}
                  />
                </InputRightAddon>
              </InputGroup>
            )}
          />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Mailing lists/aliases</FormLabel>
          <SimpleGrid columns={2} spacing={2}>
            <Checkbox ref={register} name="alias-minister">
              minister@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-pastor">
              pastor@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-contact">
              contact@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-info">
              info@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-bom">
              bom@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-elders">
              elders@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-deacons">
              deacons@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-secretary">
              secretary@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-treasurer">
              treasurer@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-pc">
              pc@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-committee">
              committee@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-welcoming">
              welcoming@{site}
            </Checkbox>
            <Checkbox ref={register} name="alias-youth">
              youth@{site}
            </Checkbox>
          </SimpleGrid>
          <FieldArray
            add="Add alias/email"
            identifier="additional_aliases"
            Item={({item, remove, index}) => (
              <InputGroup key={item.id}>
                <Input
                  ref={register()}
                  type="text"
                  borderLeftRadius="0"
                  name={`items[${index}].additional_aliases`}
                />
                <InputRightAddon>
                  <IconButton
                    icon={<MdDelete />}
                    name="remove"
                    onClick={() => remove(index)}
                  />
                </InputRightAddon>
              </InputGroup>
            )}
          />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FileInput
            accept="application/xlsx"
            text="Drop orgchart.xlsx here"
            name="structure"
            label="Organisation Chart"
            description={
              <p>
                <a href="mything.xlsx">Download this template org chart</a>,
                complete it and re-upload it to the field below
              </p>
            }
          />
        </FormControl>
      </AccordionPanel>
    </div>
  );
};

export default AdminDetails;
