import {useEffect, useState} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
  AccordionPanel,
  UnorderedList,
  Button
} from '@chakra-ui/react';
import {MdDelete} from 'react-icons/md';
import FileInput from './file-input.js';
import AccordionTop from './accordion-top.js';
import {uuid} from '@sanity/uuid';

const ContentDetails = ({project}) => {
  const [percent, setPercent] = useState();

  const {register, errors, watch} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    name: 'social_url'
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
        <FormControl isInvalid={errors.name} variant="project">
          <FileInput
            multiple
            accept="application/pdf, application/doc, application/xlsx"
            text="Drop PDF, .docx or .xlsx archive here"
            name="structure"
            label="Content structure"
            project={project}
            description={
              <p>
                Upload a document outlining your website structure. Could be a
                mindmap, a spreadsheet, a photo of the back of a napkin. It
                doesn‘t have to be complete, just make a start.
              </p>
            }
          />
        </FormControl>
        <FormControl isInvalid={errors.name} variant="project">
          <FormLabel>Social media URLs</FormLabel>
          <UnorderedList
            styleType="none"
            spacing="2"
            marginLeft="0"
            marginBottom="4"
          >
            {fields.map((item, index) => {
              return (
                <li key={item.id}>
                  <input
                    ref={register()}
                    name={`social_url[${index}]._key`}
                    defaultValue={item._key}
                    type="hidden"
                  />
                  <InputGroup>
                    <InputLeftAddon>https://</InputLeftAddon>
                    <Input
                      ref={register()}
                      name={`social_url[${index}].url`}
                      defaultValue={item.url}
                      type="text"
                      placeholder="Add URL"
                    />
                    <InputRightElement>
                      <IconButton
                        icon={<MdDelete />}
                        name="remove"
                        onClick={() => remove(index)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </li>
              );
            })}
            ;
          </UnorderedList>

          <Button
            type="button"
            onClick={() => {
              append({_key: uuid(), social_url: ''});
            }}
          >
            Add social media URL
          </Button>
        </FormControl>
      </AccordionPanel>
    </div>
  );
};

export default ContentDetails;
