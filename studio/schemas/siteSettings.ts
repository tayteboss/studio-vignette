export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'Address',
      name: 'address',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Address URL',
      name: 'addressUrl',
      type: 'url',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Phone',
      name: 'phone',
      type: 'string',
    },
    {
      title: 'Instagram URL',
      name: 'instagramUrl',
      type: 'url',
    },
    {
      title: 'Instagram Username',
      name: 'instagramUsername',
      type: 'string',
    },
    {
      title: 'Facebook URL',
      name: 'facebookUrl',
      type: 'url',
    },
    {
      title: 'Credits',
      name: 'credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
            },
          ],
        },
      ],
    },
  ],
}
