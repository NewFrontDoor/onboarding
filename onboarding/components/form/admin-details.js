import React, {useEffect, useState} from 'react';
import {FormControl, AccordionPanel} from '@chakra-ui/react';
import {useFormContext} from 'react-hook-form';
import FileInput from './file-input.js';
import AccordionTop from './accordion-top.js';
import CMSDetails from './cms-details.js';
import EmailDetails from './email-details.js';
import AccountDetails from './account-details.js';

const AdminDetails = ({project}) => {
  const [percent, setPercent] = useState();

  const {register, errors, getValues, watch} = useFormContext();

  const wfields = watch([
    'cms',
    'alias',
    'structure',
    'church_management_system'
  ]);

  useEffect(() => {
    const entries = Object.values(wfields).filter((v) => v).length;
    setPercent((entries / 3) * 100);
  }, [wfields]);

  return (
    <div>
      <AccordionTop percent={percent || 0}>
        Office 365 and Administrative
      </AccordionTop>
      <AccordionPanel pb={4}>
        <AccountDetails />
        <CMSDetails />
        <EmailDetails />

        <FormControl isInvalid={errors.name} variant="project">
          <FileInput
            accept="application/xlsx"
            text="Drop orgchart.xlsx here"
            name="structure"
            label="Organisation Chart"
            project={project}
            description={
              <p>
                <a href="mything.xlsx">Download this template org chart</a>,
                complete it and re-upload it to the field below. This is where
                you can allocate who receives emails from the above mailing
                lists/aliases
              </p>
            }
          />
        </FormControl>
      </AccordionPanel>
    </div>
  );
};

export default AdminDetails;
