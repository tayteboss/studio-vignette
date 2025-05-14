import {CaseIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {
  considerationsBlockPB,
  contentBlockPB,
  headingBlockPB,
  imageGalleryBlockPB,
  mediaBlock,
  mediaBlockPB,
  productGalleryBlockPB,
  ratioList,
  testimonialBlockPB,
} from '../objects'

export default {
  title: 'Field Note',
  name: 'fieldNote',
  type: 'document',
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'fieldNote'}),
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
      validation: (Rule: any) => [
        Rule.required().error('Categories are required'),
        Rule.min(1).error('At least one category must be selected'),
      ],
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Season',
      name: 'season',
      type: 'string',
      options: {
        list: ['Spring', 'Summer', 'Autumn', 'Winter'],
      },
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
      },
    },
    {
      title: 'Hero Media Caption',
      name: 'heroMediaCaption',
      type: 'string',
    },
    {
      title: 'Page Builder',
      name: 'pageBuilder',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              component: 'component',
            },
            prepare: ({component}: any) => {
              let componentName = ''

              if (component === 'headingBlockPB') {
                componentName = 'Heading Block'
              } else if (component === 'contentBlockPB') {
                componentName = 'Content Block'
              } else if (component === 'imageGalleryBlockPB') {
                componentName = 'Image Gallery Block'
              } else if (component === 'mediaBlockPB') {
                componentName = 'Media Block'
              } else if (component === 'productGalleryBlockPB') {
                componentName = 'Product Gallery Block'
              } else if (component === 'considerationsBlockPB') {
                componentName = 'Considerations Block'
              } else if (component === 'testimonialBlockPB') {
                componentName = 'Testimonial Block'
              } else {
                componentName = 'Unknown'
              }

              return {
                title: componentName,
              }
            },
          },
          fields: [
            {
              title: 'Select Media Component',
              name: 'component',
              type: 'string',
              options: {
                list: [
                  {title: 'Heading Block', value: 'headingBlockPB'},
                  {title: 'Content Block', value: 'contentBlockPB'},
                  {title: 'Image Gallery Block', value: 'imageGalleryBlockPB'},
                  {title: 'Media Block', value: 'mediaBlockPB'},
                  {title: 'Product Gallery Block', value: 'productGalleryBlockPB'},
                  {title: 'Considerations Block', value: 'considerationsBlockPB'},
                  {title: 'Testimonial Block', value: 'testimonialBlockPB'},
                ],
                layout: 'dropdown',
              },
            },
            headingBlockPB,
            contentBlockPB,
            imageGalleryBlockPB,
            mediaBlockPB,
            productGalleryBlockPB,
            considerationsBlockPB,
            testimonialBlockPB,
          ],
        },
      ],
    },
  ],
}
