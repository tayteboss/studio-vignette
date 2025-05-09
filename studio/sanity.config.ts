import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {muxInput} from 'sanity-plugin-mux-input'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {EarthGlobeIcon, DocumentIcon, CaseIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export default defineConfig({
  name: 'default',
  title: 'Studio Vignette',

  projectId: 'dlgykjy2',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .icon(EarthGlobeIcon)
              .child(S.editor().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Home Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Information Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('informationPage').documentId('informationPage')),
            S.listItem()
              .title('Field Notes Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('fieldNotesPage').documentId('fieldNotesPage')),
            S.divider(),
            S.listItem()
              .title('Field Notes')
              .icon(CaseIcon)
              .child(
                S.documentList()
                  .title('Field Notes')
                  .schemaType('fieldNote')
                  .filter('_type == "fieldNote"'),
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              title: 'Order: Field Notes',
              type: 'fieldNote',
              S,
              context,
            }) as any,
          ])
      },
    }),
    visionTool(),
    muxInput({mp4_support: 'standard', max_resolution_tier: '2160p'}),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  parts: [
    {
      name: 'part:@sanity/base/theme/variables-style',
      path: './customEditorStyles.css',
    },
  ],
})
