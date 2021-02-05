import {MdLink, MdAttachFile} from 'react-icons/md';
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'Quote', value: 'blockquote'},
        {title: 'Presentation', value: 'presentation'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'}
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: MdLink
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [{type: 'page'}]
              }
            ]
          },
          {
            name: 'assetLink',
            type: 'object',
            title: 'Asset link',
            blockEditor: {
              icon: MdAttachFile
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [{type: 'asset'}]
              }
            ]
          },
          {
            title: 'Anchor',
            name: 'anchor',
            type: 'object',
            fields: [
              {
                title: 'ID',
                name: 'id',
                type: 'string'
              }
            ]
          },
          {
            title: 'Inline button',
            name: 'inlineButton',
            type: 'object',
            fields: [
              {
                name: 'style',
                title: 'Style',
                type: 'string',
                options: {
                  list: [
                    {title: 'Ghost', value: 'ghost'},
                    {title: 'Warning-ghost', value: 'warning'},
                    {title: 'Regular', value: 'regular'}
                  ],
                  layout: 'dropdown'
                }
              },
              {
                title: 'Link',
                name: 'link',
                type: 'url',
                validation: Rule => Rule.uri({allowRelative: true})
              }
            ]
          }
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'image',
      fields: [
        {
          title: 'alignment',
          name: 'alignment',
          type: 'string',
          options: {
            layout: 'dropdown',
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Centre', value: 'center'},
              {title: 'Right', value: 'right'}
            ]
          }
        },
        {
          title: 'Text wrapping',
          name: 'wrapping',
          type: 'string',
          options: {
            layout: 'dropdown',
            list: [
              {title: 'Top and bottom', value: 'block'},
              {title: 'In line with text', value: 'float'}
            ]
          }
        },
        {
          title: 'Width percentage',
          name: 'width',
          type: 'number'
        }
      ],
      options: {hotspot: true}
    },
    {
      title: 'Content block',
      type: 'reference',
      to: [{type: 'gridblock'}, {type: 'form'}]
    },
  ]
};
