export default {
  name: 'gridblock',
  title: 'Grid block',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Block identifier',
      type: 'string'
    },
    {
      name: 'columns',
      title: 'Number of grid columns',
      description:
        'This number defines the default maximum number of columns per view. However on smaller screens, content will wrap onto more rows with reduced columns.',
      type: 'number'
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Card style', value: 'card'},
          {title: 'Horizontal card style', value: 'horizontal'},
          {title: 'Overlay style', value: 'overlay'}
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {
          title: 'Grid item',
          name: 'griditem',
          type: 'object',
          fields: [
            {title: 'Header', name: 'header', type: 'string'},
            {
              title: 'Description',
              name: 'description',
              type: 'array',
              of: [{type: 'block'}]
            },
            {
              title: 'Action',
              name: 'action',
              type: 'string',
              description: 'If left blank, will default to "View page"'
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: Rule => Rule.uri({allowRelative: true})
            },
            {title: 'Image', name: 'image', type: 'image'}
          ]
        },
        {
          title: 'Page',
          type: 'reference',
          to: [{type: 'page'}]
        }
      ]
    }
  ]
};
