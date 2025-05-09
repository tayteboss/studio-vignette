import {mediaBlock} from '../objects'

export default {
  title: 'Information Page',
  name: 'informationPage',
  type: 'document',
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'SEO title',
      name: 'seoTitle',
      type: 'string',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
    },
    {
      title: 'Profile Text',
      name: 'profileText',
      type: 'text',
      rows: 4,
    },
    {
      title: 'Careers Text',
      name: 'careersText',
      type: 'text',
      rows: 4,
    },
    {
      title: 'Media',
      name: 'media',
      type: 'object',
      fields: mediaBlock,
    },
    {
      title: 'Media Identifiers',
      name: 'mediaIdentifiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Position',
              name: 'position',
              type: 'string',
              description: 'e.g. [Left]',
            },
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Role',
              name: 'role',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
