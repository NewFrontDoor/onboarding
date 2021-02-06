import {useState, useEffect} from 'react';
import {
  FormControl,
  FormLabel,
  AccordionPanel,
  Textarea
} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import AccordionTop from './accordion-top.js';

const DesignDetails = () => {
  const [percent, setPercent] = useState(0);
  const {register, errors, watch} = useFormContext();

  const wfields = watch(['website_purpose', 'website_audience']);

  useEffect(() => {
    const entries = Object.values(wfields).filter((v) => v !== '').length;
    setPercent((entries / 2) * 100);
  }, [wfields]);

  return (
    <div>
      <AccordionTop percent={percent}>
        Website purpose and target audience
      </AccordionTop>
      <AccordionPanel pb={4}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Purpose of website</FormLabel>
          <Textarea ref={register} name="website_purpose" />
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Target audience</FormLabel>
          <Textarea ref={register} name="website_audience" />
        </FormControl>
      </AccordionPanel>
    </div>
  );
};

export default DesignDetails;
