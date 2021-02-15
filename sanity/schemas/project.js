export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fieldsets: [{name: 'design', title: 'Style and design'}],
  fields: [
    {
      name: 'ministry',
      title: 'Ministry',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'ministry',
        maxLength: 96
      }
    },
    {
      name: 'authorisedAccounts',
      title: 'Authorised accounts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{name: 'email', type: 'string', title: 'Email'}]
        }
      ]
    },
    {
      name: 'owner',
      title: 'Owner',
      type: 'string'
    },
    {
      name: 'abn',
      title: 'ABN',
      type: 'number'
    },
    {
      name: 'ministry_contact',
      title: 'Leaders email',
      type: 'string'
    },
    {
      name: 'church_it_contact',
      title: 'Delegated Church IT contact email',
      type: 'string'
    },
    {
      name: 'mission_statement',
      title: 'Mission statement',
      type: 'text'
    },
    {
      name: 'website_url',
      title: 'Website URL',
      type: 'url'
    },
    {
      name: 'cms',
      title: 'Church management system',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'Elvanto', value: 'elvanto'},
          {title: 'Tithely', value: 'tithely'},
          {
            title: 'Church Community Builder',
            value: 'ccb'
          },
          {title: 'Planning Center', value: 'planning_center'},
          {title: 'Jethro', value: 'jethro'},
          {title: 'None', value: 'none'}
        ]
      }
    },
    {
      name: 'additional_cms',
      title: 'Additional CMS options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{name: 'cms', type: 'string', title: 'CMS'}]
        }
      ]
    },
    {
      name: 'alias',
      title: 'Mailing lists/aliases',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'minister', value: 'minister'},
          {title: 'pastor', value: 'pastor'},
          {title: 'contact', value: 'contact'},
          {title: 'info', value: 'info'},
          {title: 'bom', value: 'bom'},
          {title: 'elders', value: 'elders'},
          {title: 'deacons', value: 'deacons'},
          {title: 'secretary', value: 'secretary'},
          {title: 'treasurer', value: 'treasurer'},
          {title: 'pc', value: 'pc'},
          {title: 'committee', value: 'committee'},
          {title: 'welcoming', value: 'welcoming'},
          {title: 'youth', value: 'youth'}
        ]
      }
    },
    {
      name: 'additional_alias',
      title: 'Additional aliases required',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{name: 'alias', type: 'string', title: 'Alias'}]
        }
      ]
    },
    {
      name: 'website_audience',
      title: 'Website audience',
      type: 'text'
    },
    {
      name: 'website_purpose',
      title: 'Website purpose',
      type: 'text'
    },
    {
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [{type: 'image'}]
    },
    {
      name: 'style_guide',
      title: 'Style guide',
      type: 'file'
    },
    {
      name: 'brand_assets',
      title: 'Brand assets',
      type: 'array',
      of: [{type: 'file'}, {type: 'image'}]
    },
    {
      name: 'colour_scheme',
      title: 'Colour scheme',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'colour', type: 'string', title: 'Colour'},
            {name: 'function', type: 'string', title: 'Function'}
          ]
        }
      ]
    },
    {
      name: 'font_choices',
      title: 'Font choices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'font', type: 'string', title: 'Font'},
            {name: 'function', type: 'string', title: 'Function'}
          ]
        }
      ]
    },
    {
      name: 'reference_websites',
      title: 'Reference websites',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{name: 'url', type: 'string', title: 'Url'}]
        }
      ]
    },
    {
      name: 'structure',
      title: 'Website structure/sitemap',
      type: 'file'
    },
    {
      name: 'social_url',
      title: 'Associated Social accounts/links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{name: 'url', type: 'string', title: 'URL'}]
        }
      ]
    },
    {
      name: 'org_chart',
      title: 'Organisation chart',
      type: 'file'
    }
  ]
};
