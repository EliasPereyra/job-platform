import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'swb3duug',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    // GROQ queries live in the Sanity CMS package, which web/ consumes.
    path: '../packages/cms-sanity/src/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../packages/cms-sanity/src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
