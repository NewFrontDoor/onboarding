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
      name: 'authorised_accounts',
      title: 'Authorised accounts',
      type: 'array',
      of: [{type: 'string'}]
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
          {title: 'Elvanto', value: 'cms-elvanto'},
          {title: 'Tithely', value: 'cms-tithely'},
          {
            title: 'Church Community Builder',
            value: 'cms-ccb'
          },
          {title: 'Planning Center', value: 'cms-planning_center'},
          {title: 'Jethro', value: 'cms-jethro'}
        ]
      }
    },
    {
      name: 'alias',
      title: 'Mailing lists/aliases',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'minister', value: 'alias-minister'},
          {title: 'pastor', value: 'alias-pastor'},
          {title: 'contact', value: 'alias-contact'},
          {title: 'info', value: 'alias-info'},
          {title: 'bom', value: 'alias-bom'},
          {title: 'elders', value: 'alias-elders'},
          {title: 'deacons', value: 'alias-deacons'},
          {title: 'secretary', value: 'alias-secretary'},
          {title: 'treasurer', value: 'alias-treasurer'},
          {title: 'pc', value: 'alias-pc'},
          {title: 'committee', value: 'alias-committee'},
          {title: 'welcoming', value: 'alias-welcoming'},
          {title: 'youth', value: 'alias-youth'}
        ]
      }
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
      type: 'file'
    },
    {
      name: 'colour_scheme',
      title: 'Colour scheme',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'font_choices',
      title: 'Font choices',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'reference_websites',
      title: 'Reference websites',
      type: 'array',
      of: [{type: 'url'}]
    },
    {
      name: 'structure',
      title: 'Website structure/sitemap',
      type: 'file'
    },
    {
      name: 'socials',
      title: 'Associated Social accounts/links',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'org_chart',
      title: 'Organisation chart',
      type: 'file'
    },
  ]
};
