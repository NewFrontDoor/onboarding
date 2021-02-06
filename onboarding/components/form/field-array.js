import React from 'react';
import {Button} from '@chakra-ui/react';
import {useFieldArray} from 'react-hook-form';
import {MdAddCircle} from 'react-icons/md';

const FieldArray = ({nestIndex, control, Item, add, identifier}) => {
  const {fields, remove, append} = useFieldArray({
    control,
    name: `${identifier}.fieldArray`
  });

  return (
    <div>
      {fields.map((item, index) => (
        <Item key={item.id} item={item} remove={remove} index={index} />
      ))}
      <Button
        colorScheme="green"
        leftIcon={<MdAddCircle />}
        size="xs"
        onClick={() => append({})}
      >
        {add}
      </Button>
    </div>
  );
};

export default FieldArray;
