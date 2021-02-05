import {MdAccountCircle} from 'react-icons/md';

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  icon: MdAccountCircle,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      readOnly: 'true',
      fields: [
        {name: 'last', type: 'string', title: 'Last'},
        {name: 'first', type: 'string', title: 'First'}
      ]
    },
    {
      name: 'email',
      title: 'Email',
      readOnly: 'true',
      type: 'string'
    },
    {
      name: 'createdProjects',
      title: 'Created Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}]
        }
      ]
    }
  ],
  preview: {
    select: {
      first: 'name.first',
      last: 'name.last',
      subtitle: 'email'
    },
    prepare(selection) {
      const {first, last, subtitle} = selection;
      return {
        title: `${first} ${last}`,
        subtitle
      };
    }
  }
};
