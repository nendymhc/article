import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Learning Hub',

  projectId: 'oc8o64xp',
  dataset: 'oneapp-staging',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
