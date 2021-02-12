import PropTypes from 'prop-types';
import {useForm, FormProvider} from 'react-hook-form';
import CoreDetails from './core-details.js';
import ContentDetails from './content-details.js';
import DesignDetails from './design-details.js';
import AdminDetails from './admin-details.js';
import Purpose from './purpose.js';
import ControlBox from './control-box.js';
import {SlideFade, Accordion, AccordionItem} from '@chakra-ui/react';
import {DevTool} from '@hookform/devtools';
import {useMutation} from 'react-query';

const submitForm = (sanityData, data) => {
  const merged = {
    slug: sanityData.slug,
    owner: sanityData.owner,
    _id: sanityData._id,
    _createdAt: sanityData._createdAt,
    _type: sanityData._type,
    ...data,
    abn: Number.parseInt(data.abn, 10)
  };

  return fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(merged)
  }).then((response) => response.json());
};

const FormComponent = ({sanityData}) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...sanityData
    }
  });

  const {reset, formState, handleSubmit, control} = methods;

  const mutation = useMutation((data) => submitForm(sanityData, data), {
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('todos')
      console.log('hooray!');
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <SlideFade in={sanityData} offsetY="-100px">
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
        </SlideFade>
        <ControlBox
          isLoading={mutation.isLoading}
          isOwner={sanityData.isOwner}
          editors={sanityData.authorisedAccounts}
          formState={formState}
          reset={reset}
          initialData={sanityData}
        />
      </form>
    </FormProvider>
  );
};

FormComponent.propTypes = {
  sanityData: PropTypes.shape({
    _createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
    _type: PropTypes.any,
    authorisedAccounts: PropTypes.arrayOf(PropTypes.string),
    isOwner: PropTypes.bool,
    owner: PropTypes.string,
    slug: PropTypes.string
  })
};

export default FormComponent;
