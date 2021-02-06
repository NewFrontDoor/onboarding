import PropTypes from 'prop-types';
import {useForm, FormProvider} from 'react-hook-form';
import CoreDetails from './core-details.js';
import ContentDetails from './content-details.js';
import DesignDetails from './design-details.js';
import AdminDetails from './admin-details.js';
import Purpose from './purpose.js';
import ControlBox from './control-box.js';
import {Input, Accordion, AccordionItem} from '@chakra-ui/react';
import {DevTool} from '@hookform/devtools';

const FormComponent = ({sanityData}) => {
  console.log(sanityData);
  const onSubmit = (data) => console.log(data);
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...sanityData
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Accordion defaultIndex={[0]}>
          <AccordionItem>
            <CoreDetails />
          </AccordionItem>
          <AccordionItem>
            <AdminDetails site="example.com" />
          </AccordionItem>
          <AccordionItem>
            <Purpose />
          </AccordionItem>
          <AccordionItem>
            <DesignDetails />
          </AccordionItem>
          <AccordionItem>
            <ContentDetails />
          </AccordionItem>
        </Accordion>
        <ControlBox
          isOwner={sanityData.isOwner}
          editors={sanityData.authorisedAccounts}
        />
        <Input type="submit" />
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};

FormComponent.propTypes = {
  sanityData: PropTypes.shape({
    authorisedAccounts: PropTypes.arrayOf(PropTypes.string),
    isOwner: PropTypes.any
  })
};

export default FormComponent;
