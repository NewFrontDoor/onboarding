import PropTypes from 'prop-types';
import {useForm, FormProvider} from 'react-hook-form';
import CoreDetails from './core-details.js';
import ContentDetails from './content-details.js';
import DesignDetails from './design-details.js';
import AdminDetails from './admin-details.js';
import Purpose from './purpose.js';
import ControlBox from './control-box.js';
import {SlideFade, Accordion, AccordionItem, Grid} from '@chakra-ui/react';
import {DevTool} from '@hookform/devtools';
import {useMutation, useQuery} from 'react-query';
import slugify from '@sindresorhus/slugify';

function getUser() {
  return fetch('/api/me').then((response) => {
    if (response.ok) return response.json();
  });
}

async function submitForm(sanityData, data, user) {
  const merged = {
    slug: sanityData.slug || {_type: 'slug', current: slugify(data.ministry)},
    owner: sanityData.owner || user.data.email,
    _id: sanityData._id,
    _createdAt: sanityData?._createdAt,
    _type: sanityData._type,
    authorisedAccounts: sanityData.authorisedAccounts,
    ...data,
    abn: Number.parseInt(data.abn, 10)
  };

  return fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(merged)
  }).then((response) => {
    return response.json();
  });
}

const FormComponent = ({sanityData}) => {
  const user = useQuery('user', getUser);
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...sanityData
    }
  });

  const {reset, formState, handleSubmit, control} = methods;

  const mutation = useMutation((data) => submitForm(sanityData, data, user), {
    onError: (error, variables, context) => {
      console.log(error);
      console.log(variables);
      console.log(context);
    },
    onSuccess: (data, variables) => {
      if (variables) {
        reset(variables);
      }

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
        <Grid templateColumns="0.5fr 2.5fr 1fr" gap={6}>
          <div />
          <SlideFade in={sanityData} offsetY="-100px">
            <Accordion allowMultiple defaultIndex={[0, 1, 2, 3, 4]}>
              <AccordionItem>
                <CoreDetails />
              </AccordionItem>
              <AccordionItem>
                <AdminDetails project={sanityData._id} site="example.com" />
              </AccordionItem>
              <AccordionItem>
                <Purpose />
              </AccordionItem>
              <AccordionItem>
                <DesignDetails project={sanityData._id} />
              </AccordionItem>
              <AccordionItem>
                <ContentDetails project={sanityData._id} />
              </AccordionItem>
            </Accordion>
          </SlideFade>
          <ControlBox
            isLoading={mutation.isLoading}
            isOwner={sanityData.isOwner}
            formState={formState}
            reset={reset}
            initialData={sanityData}
          />
        </Grid>
      </form>
      <DevTool control={control} />
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
