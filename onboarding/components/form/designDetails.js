import React from 'react';
import {
  Flex,
  Spacer,
  FormControl,
  IconButton,
  FormLabel,
  Select,
  Input,
  InputLeftAddon,
  InputRightElement,
  InputGroup,
  AccordionPanel
} from '@chakra-ui/react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import FieldArray from './fieldArray';
import {MdDelete} from 'react-icons/md';
import FileInput from './fileInput';
import AccordionTop from './accordion-top';

const DesignDetails = () => {
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
    name: 'colour_scheme'
  });
  return (
    <div>
      <AccordionTop percent={95}>Design and images</AccordionTop>
      <AccordionPanel pb={4}>
        <FormControl isInvalid={errors.name}>
          <FileInput
            multiple
            accept="image/png, image/jpg, image/jpeg, image/svg"
            name="images"
            label="Logo images"
            description={
              <ul>
                <li>Required: SVG version of your primary logo</li>
                <li>
                  Preferred: any variations (horizontal, vertical, minimal) also
                  in SVG format
                </li>
                <li>
                  N.b. if you don't have an SVG version, contact your graphic
                  designer and they will produce one for you. If this isn't
                  possible, upload a png or jpg in the highest possible quality
                  and size.
                </li>
              </ul>
            }
          />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FileInput
            multiple
            accept="application/pdf, application/zip"
            text="Drop PDF file or ZIP archive here"
            name="style_guide"
            label="Style guide"
          />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FileInput
            multiple
            accept="image/png, image/jpg, image/jpeg, image/svg"
            text="Drop image files here"
            name="brand_assets"
            label="Additional brand assets, photographs, illustrations"
          />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Colour Scheme</FormLabel>
          <FieldArray
            identifier="colour_scheme"
            add="Add a colour"
            Item={({item, remove, index}) => (
              <Flex key={item.id} justify="flex-start">
                <InputGroup w="50">
                  <InputLeftAddon children="#" />
                  <Input
                    ref={register()}
                    type="text"
                    borderLeftRadius="0"
                    name={`items[${index}].colour_code`}
                  />
                </InputGroup>
                <Spacer />
                <Select
                  ref={register()}
                  w="60"
                  name={`items[${index}].colour_role`}
                >
                  <option selected value="primary">
                    Primary
                  </option>
                  <option value="secondary">Secondary</option>
                  <option value="highlight">Highlight</option>
                  <option value="lowlight">Lowlight</option>
                  <option value="text">Text</option>
                </Select>
                <Spacer />
                <IconButton
                  icon={<MdDelete />}
                  name="remove"
                  onClick={() => remove(index)}
                />
              </Flex>
            )}
          />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Font choices</FormLabel>
          <Input ref={register} name="font_choices" />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Reference websites</FormLabel>
          {fields.map(({id, url_value}, index) => {
            return (
              <div key={id}>
                <InputGroup>
                  <InputLeftAddon>https://</InputLeftAddon>
                  <Input
                    ref={register()}
                    type="text"
                    borderLeftRadius="0"
                    name={`url_value[${index}]`}
                    defaultValue={url_value}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={<MdDelete />}
                      name="remove"
                      onClick={() => remove(index)}
                    />
                  </InputRightElement>
                </InputGroup>
              </div>
            );
          })}
          <button type="button" onClick={() => append({})}>
            Add a URL
          </button>
        </FormControl>
      </AccordionPanel>
    </div>
  );
};

export default DesignDetails;
