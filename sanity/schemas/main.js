export default {
  name: 'main',
  title: 'Main',
  type: 'document',
  fieldsets: [
    {
      name: 'header',
      title: 'Header/Menu items',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false // Defines if the fieldset should be collapsed by default or not
      }
    },
    {
      name: 'body',
      title: 'Body items',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: false // Defines if the fieldset should be collapsed by default or not
      }
    }
  ],
  fields: [
    {
      title: 'Home page heading',
      name: 'heading',
      description: 'This is your main welcome text',
      type: 'string',
      fieldset: 'header'
    },
    {
      title: 'Main menu items',
      name: 'menuitems',
      description:
        'Add pages below to feature in the main menu. This can be a nested menu. If only one child item is included, it willbe displayed as a primary link. If is are more than one child, it will be displayed as a dropdown menu.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {title: 'Menu text', name: 'text', type: 'string'},
            {
              title: 'Child pages',
              name: 'childpages',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  title: 'Child page',
                  description: 'Pick a page from the dropdown list below',
                  to: [
                    {
                      type: 'page'
                    }
                  ]
                },
                {
                  type: 'object',
                  title: 'External page',
                  description: 'Enter a URL below and provide the menu text',
                  fields: [
                    {title: 'Menu text', name: 'text', type: 'string'},
                    {title: 'External URL', name: 'url', type: 'url'}
                  ]
                }
              ]
            }
          ]
        }
      ],
      fieldset: 'header'
    },
    {
      title: 'Body text',
      name: 'mainText',
      type: 'blockContent',
      fieldset: 'body'
    }
  ]
};
