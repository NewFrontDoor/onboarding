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
import {submitForm} from '../../lib/sanity-fns.js';

const FormComponent = ({sanityData}) => {
  console.log(sanityData);
  const onSubmit = (data) => {
    const merged = {
      slug: sanityData.slug,
      owner: sanityData.owner,
      _id: sanityData._id,
      _createdAt: sanityData._createdAt,
      _type: sanityData._type,
      ...data,
      abn: Number.parseInt(data.abn, 10),
      font_choices: data.font_choices.split(', ')
    };
    console.log(merged);
    submitForm(merged);
  };

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...sanityData
    }
  });

  const {reset, formState, handleSubmit, control} = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion allowMultiple defaultIndex={[0, 1, 2, 3, 4]}>
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
          formState={formState}
          reset={reset}
          initialData={sanityData}
        />
      </form>

      <DevTool control={control} />
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
