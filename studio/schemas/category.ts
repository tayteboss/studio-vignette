import {TagIcon} from '@sanity/icons'

export default {
  title: 'Category',
  name: 'category',
  type: 'document',
  icon: TagIcon,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}
