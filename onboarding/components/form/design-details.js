import {
  FormControl,
  IconButton,
  FormLabel,
  Input,
  InputLeftAddon,
  InputRightElement,
  InputGroup,
  AccordionPanel,
  Button,
  UnorderedList
} from '@chakra-ui/react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {MdDelete} from 'react-icons/md';
import FileInput from './file-input.js';
import FontChoices from './font-choices.js';
import ColourChoices from './colour-choices.js';
import AccordionTop from './accordion-top.js';
import {uuid} from '@sanity/uuid';

const DesignDetails = ({project}) => {
  const {register, errors} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    name: 'reference_websites'
  });
  return (
    <div>
      <AccordionTop percent={95}>Design and images</AccordionTop>
      <AccordionPanel pb={4}>
        <FormControl isInvalid={errors.name} variant="project">
          <FileInput
            multiple
            isArray
            accept="image/png, image/jpg, image/jpeg, image/svg"
            type="image"
            name="logos"
            label="Logo images"
            project={project}
            description={
              <ul>
                <li>Required: SVG version of your primary logo</li>
                <li>
                  Preferred: any variations (horizontal, vertical, minimal) also
                  in SVG format
                </li>
                <li>
                  N.b. if you don‘t have an SVG version, contact your graphic
                  designer and they will produce one for you. If this isn‘t
                  possible, upload a png or jpg in the highest possible quality
                  and size.
                </li>
              </ul>
            }
          />
        </FormControl>
        <FormControl isInvalid={errors.name} variant="project">
          <FileInput
            multiple
            accept="application/pdf, application/zip"
            text="Drop PDF file or ZIP archive here"
            name="style_guide"
            label="Style guide"
            project={project}
          />
        </FormControl>
        <FormControl isInvalid={errors.name} variant="project">
          <FileInput
            multiple
            isArray
            accept="image/png, image/jpg, image/jpeg, image/svg"
            type="image"
            text="Drop image files here"
            name="brand_assets"
            label="Additional brand assets, photographs, illustrations"
            project={project}
          />
        </FormControl>
        <ColourChoices />
        <FontChoices />
        <FormControl isInvalid={errors.name} variant="project">
          <FormLabel>Reference websites</FormLabel>
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
                    name={`reference_websites[${index}]._key`}
                    defaultValue={item._key}
                    type="hidden"
                  />
                  <InputGroup>
                    <InputLeftAddon>https://</InputLeftAddon>
                    <Input
                      ref={register()}
                      name={`reference_websites[${index}].url`}
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
              append({_key: uuid(), reference_websites: ''});
            }}
          >
            Add a URL
          </Button>
        </FormControl>
      </AccordionPanel>
    </div>
  );
};

export default DesignDetails;
