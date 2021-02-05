import React, {useEffect, useState} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
  AccordionPanel
} from '@chakra-ui/react';
import {MdDelete} from 'react-icons/md';
import FileInput from './fileInput';
import FieldArray from './fieldArray';
import AccordionTop from './accordion-top';

const ContentDetails = () => {

  const [percent, setPercent] = useState()

  const {
    register,
    unregister,
    errors,
    setValue,
    watch,
    control
  } = useFormContext();
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'socials'
  });

  const wfields = watch(['structure', 'social_media']);

  useEffect(() => {
    const entries = Object.values(wfields).filter((v) => v).length;
    setPercent((entries / 2) * 100);
  }, [wfields]);

  return (
    <div>
      <AccordionTop percent={percent || 0}>Content details</AccordionTop>
      <AccordionPanel pb={4}>
        <FormControl isInvalid={errors.name}>
          <FileInput
            multiple
            accept="application/pdf, application/doc, application/xlsx"
            text="Drop PDF, .docx or .xlsx archive here"
            name="structure"
            label="Content structure"
            description={
              <p>
                Upload a document outlining your website structure. Could be a
                mindmap, a spreadsheet, a photo of the back of a napkin. It
                doesn't have to be complete, just make a start.
              </p>
            }
          />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Social media URLs</FormLabel>
          <FieldArray
            identifier="social_media"
            add="Add a URL"
            Item={({item, remove, index}) => (
              <InputGroup>
                <InputLeftAddon>https://</InputLeftAddon>
                <Input
                  ref={register()}
                  type="text"
                  borderLeftRadius="0"
                  name={`social_media[${index}]`}
                />
                <InputRightElement>
                  <IconButton
                    icon={<MdDelete />}
                    name="remove"
                    onClick={() => remove(index)}
                  />
                </InputRightElement>
              </InputGroup>
            )}
          />
        </FormControl>
      </AccordionPanel>
    </div>
  );
};

export default ContentDetails;
