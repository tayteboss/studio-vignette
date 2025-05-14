const selectMediaTypeObject = {
  title: 'Select Media Type',
  name: 'mediaType',
  type: 'string',
  options: {
    list: [
      {title: 'Image', value: 'image'},
      {title: 'Video', value: 'video'},
    ],
    layout: 'dropdown',
  },
}

const ratioList = [
  {title: '1:1 - Square', value: '100%'},
  {title: '2:3 - Portrait', value: '150%'},
  {title: '4:5 - Portrait', value: '125%'},
  {title: '5:4 - Landscape', value: '80%'},
  {title: '3:2 - Landscape', value: '66.66%'},
  {title: '16:9 - Landscape', value: '56.25%'},
]

const seoObject = {
  title: 'SEO',
  name: 'seo',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'SEO Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
    },
  ],
}

const imageObject = {
  title: 'Image',
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    },
  ],
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const videoObject = {
  title: 'Video',
  name: 'video',
  type: 'mux.video',
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const mediaBlock = [
  selectMediaTypeObject,
  {
    ...imageObject,
    hidden: ({parent}: any) => parent?.mediaType !== 'image',
  },
  {
    ...videoObject,
    hidden: ({parent}: any) => parent?.mediaType !== 'video',
  },
]

const headingBlockPB = {
  title: 'Heading Block',
  name: 'headingBlockPB',
  type: 'object',
  fields: [
    {
      title: 'Subheading',
      name: 'subheading',
      type: 'string',
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'text',
    },
  ],
  hidden: ({parent}: any) => parent?.component !== 'headingBlockPB',
}

const contentBlockPB = {
  title: 'Content Block',
  name: 'contentBlockPB',
  type: 'object',
  fields: [
    {
      title: 'Subheading',
      name: 'subheading',
      type: 'string',
    },
    {
      title: 'Content Block',
      name: 'contentBlock',
      type: 'array',
      of: [
        {
          title: 'Content',
          name: 'content',
          type: 'object',
          fields: [
            {
              title: 'Content',
              name: 'content',
              type: 'text',
            },
          ],
        },
        {
          title: 'Media',
          name: 'media',
          type: 'object',
          fields: [
            {
              title: 'Figure Number',
              name: 'figureNumber',
              type: 'string',
            },
            {
              title: 'Caption',
              name: 'caption',
              type: 'text',
              rows: 3,
            },
            {
              title: 'Media',
              name: 'media',
              type: 'object',
              fields: mediaBlock,
            },
            {
              title: 'Media Ratio',
              name: 'mediaRatio',
              type: 'string',
              options: {
                list: ratioList,
                layout: 'radio',
              },
            },
          ],
        },
      ],
    },
    {
      title: 'Hero Media',
      name: 'heroMedia',
      type: 'object',
      fields: mediaBlock,
    },
    {
      title: 'Hero Media Ratio',
      name: 'heroMediaRatio',
      type: 'string',
      options: {
        list: ratioList,
        layout: 'radio',
      },
    },
    {
      title: 'Hero Media Figure Number',
      name: 'heroMediaFigureNumber',
      type: 'string',
    },
    {
      title: 'Hero Media Title',
      name: 'heroMediaTitle',
      type: 'string',
    },
    {
      title: 'Hero Media Caption',
      name: 'heroMediaCaption',
      type: 'text',
      rows: 3,
    },
  ],
  hidden: ({parent}: any) => parent?.component !== 'contentBlockPB',
}

const imageGalleryBlockPB = {
  title: 'Image Gallery Block',
  name: 'imageGalleryBlockPB',
  type: 'object',
  fields: [
    {
      title: 'Gallery Items',
      name: 'galleryItems',
      type: 'array',
      description: 'This gallery works best with no more than 5 images',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Media',
              name: 'media',
              type: 'object',
              fields: mediaBlock,
            },
            {
              title: 'Figure Number',
              name: 'figureNumber',
              type: 'string',
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Caption',
              name: 'caption',
              type: 'text',
              rows: 3,
            },
            {
              title: 'URL',
              name: 'url',
              type: 'url',
              description: 'Optional link URL',
            },
          ],
        },
      ],
    },
  ],
  hidden: ({parent}: any) => parent?.component !== 'imageGalleryBlockPB',
}

const mediaBlockPB = {
  title: 'Media Block',
  name: 'mediaBlockPB',
  type: 'object',
  fields: [
    {
      title: 'Media',
      name: 'media',
      type: 'object',
      fields: mediaBlock,
    },
    {
      title: 'Media Ratio',
      name: 'mediaRatio',
      type: 'string',
      options: {
        list: ratioList,
        layout: 'radio',
      },
    },
    {
      title: 'Figure Number',
      name: 'figureNumber',
      type: 'string',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
  ],
  hidden: ({parent}: any) => parent?.component !== 'mediaBlockPB',
}

const productGalleryBlockPB = {
  title: 'Product Gallery Block',
  name: 'productGalleryBlockPB',
  type: 'object',
  fields: [
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Image',
              name: 'image',
              type: 'image',
            },
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
            {
              title: 'Features',
              name: 'features',
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
                      title: 'Value',
                      name: 'value',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
            {
              title: 'Description',
              name: 'description',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  hidden: ({parent}: any) => parent?.component !== 'productGalleryBlockPB',
}

const considerationsBlockPB = {
  title: 'Considerations Block',
  name: 'considerationsBlockPB',
  type: 'object',
  fields: [
    {
      title: 'Subheading',
      name: 'subheading',
      type: 'string',
    },
    {
      title: 'Considerations',
      name: 'considerations',
      type: 'array',
      validation: (Rule: any) => Rule.max(10),
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
              title: 'Image',
              name: 'image',
              type: 'image',
            },
            {
              title: 'Image Ratio',
              name: 'imageRatio',
              type: 'string',
              options: {
                list: ratioList,
                layout: 'radio',
              },
            },
            {
              title: 'Description',
              name: 'description',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  hidden: ({parent}: any) => parent?.component !== 'considerationsBlockPB',
}

const testimonialBlockPB = {
  title: 'Testimonial Block',
  name: 'testimonialBlockPB',
  type: 'object',
  fields: [
    {
      title: 'Quote',
      name: 'quote',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Figure Number',
      name: 'figureNumber',
      type: 'string',
    },
    {
      title: 'Author and Date',
      name: 'authorAndDate',
      type: 'string',
    },
  ],
  hidden: ({parent}: any) => parent?.component !== 'testimonialBlockPB',
}

export {
  mediaBlock,
  imageObject,
  videoObject,
  selectMediaTypeObject,
  seoObject,
  ratioList,
  headingBlockPB,
  contentBlockPB,
  imageGalleryBlockPB,
  mediaBlockPB,
  productGalleryBlockPB,
  considerationsBlockPB,
  testimonialBlockPB,
}
