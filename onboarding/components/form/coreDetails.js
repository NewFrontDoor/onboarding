import React, {useEffect, useState} from 'react';
import {
  FormControl,
  Textarea,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Grid,
  GridItem,
  Tooltip,
  AccordionPanel
} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import {MdInfo} from 'react-icons/md';
import AccordionTop from './accordion-top';

const CoreDetails = () => {
  const {
    register,
    unregister,
    errors,
    setValue,
    watch,
    control
  } = useFormContext();

  const [percent, setPercent] = useState();

  const wfields = watch([
    'ministry',
    'abn',
    'ministry_contact',
    'church_it_contact',
    'mission_statement',
    'website_url'
  ]);

  useEffect(() => {
    const entries = Object.values(wfields).filter((v) => v !== '').length;
    setPercent((entries / 6) * 100);
  }, [wfields]);

  return (
    <>
      <AccordionTop percent={percent || 0}>Core details</AccordionTop>
      <AccordionPanel pb={4}>
        <Grid templateColumns="2fr 1fr 1fr 2fr" gap={6}>
          <GridItem colSpan={3}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Ministry name</FormLabel>
              <Input ref={register} name="ministry" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl isInvalid={errors.name}>
              <Tooltip
                shouldWrapChildren
                label="For not-for-profit product registration purposes"
              >
                <FormLabel>
                  ABN{' '}
                  <MdInfo
                    style={{
                      verticalAlign: 'text-bottom',
                      display: 'inline-block'
                    }}
                  />
                </FormLabel>
              </Tooltip>
              <Input ref={register} name="abn" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid={errors.name}>
              <Tooltip
                shouldWrapChildren
                label="The staff member empowered to make website decisions"
              >
                <FormLabel>
                  Staff contact email{' '}
                  <MdInfo
                    style={{
                      verticalAlign: 'text-bottom',
                      display: 'inline-block'
                    }}
                  />
                </FormLabel>
              </Tooltip>
              <Input ref={register} name="ministry_contact" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid={errors.name}>
              <Tooltip
                shouldWrapChildren
                label="A church administrator or volunteer who will upload content to the
            site"
              >
                <FormLabel>
                  Church IT contact email{' '}
                  <MdInfo
                    style={{
                      verticalAlign: 'text-bottom',
                      display: 'inline-block'
                    }}
                  />
                </FormLabel>
              </Tooltip>
              <Input ref={register} name="church_it_contact" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={errors.name}>
              <Tooltip
                shouldWrapChildren
                label="For not-for-profit product registration purposes"
              >
                <FormLabel>
                  Mission statement{' '}
                  <MdInfo
                    style={{
                      verticalAlign: 'text-bottom',
                      display: 'inline-block'
                    }}
                  />
                </FormLabel>
              </Tooltip>
              <Textarea ref={register} name="mission_statement" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={4}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Website URL</FormLabel>
              <p>
                Put in the URL you'd like to register or the one you'll continue
                to use.
              </p>
              <InputGroup>
                <InputLeftAddon>https://</InputLeftAddon>
                <Input ref={register} name="website_url" />
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>
      </AccordionPanel>
    </>
  );
};

export default CoreDetails;
