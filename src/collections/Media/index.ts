import type { CollectionConfig, Field } from 'payload/types'

const urlField: Field = {
  name: 'url',
  type: 'text',
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    delete: () => true,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        const pubR2URL =
          'https://pub-4569e4e5d557441e896fc4fbf32626f3.r2.dev/cql-storage-r2'

        doc.url = `${pubR2URL}/${doc.filename}`

        Object.keys(doc.sizes).forEach(
          csize =>
            (doc.sizes[csize].url = `${pubR2URL}/${doc.sizes[csize].filename}`),
        )
      },
    ],
  },
  upload: {
    imageSizes: [
      {
        height: 400,
        width: 400,
        crop: 'center',
        name: 'square',
      },
      {
        width: 900,
        height: 450,
        crop: 'center',
        name: 'sixteenByNineMedium',
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: 'centre',
      },
      {
        name: 'userProfileCircleImage',
        width: 44,
        height: 44,
        position: 'center',
      },
      {
        name: 'userTestimonialImage',
        width: 70,
        height: 71,
        position: 'center',
      },
      {
        name: 'propertyImage',
        width: 370,
        height: 240,
        position: 'center',
      },

      {
        name: 'featuredPropertyImage',
        width: 570,
        height: 646,
        crop: 'center',
      },
      {
        name: 'agentImage',
        width: 210,
        height: 240,
        position: 'center',
      },
      {
        name: 'aboutHeroImage',
        width: 1920,
        height: 450,
        position: 'center',
      },
      {
        name: 'aboutImage',
        width: 1170,
        height: 500,
        position: 'center',
      },
      {
        name: 'aboutLearnMoreImage',
        width: 685,
        height: 720,
        position: 'center',
      },
      {
        name: 'myPropertyImage',
        width: 280,
        height: 240,
        position: 'center',
      },
      {
        name: 'propertyGalleryImage',
        width: 1170,
        height: 650,
        position: 'center',
      },
      {
        name: 'floorImage',
        width: 490,
        height: 362,
        position: 'center',
      },
      {
        name: 'propertyAgentImage',
        width: 210,
        height: 210,
        position: 'center',
      },
      {
        name: 'userPropertyReviewImage',
        width: 60,
        height: 60,
        position: 'center',
      },
      {
        name: 'reviewPropertyImage',
        width: 110,
        height: 90,
        position: 'center',
      },
    ],
    focalPoint: false,
    crop: false,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
    },

    // The following fields should be able to be merged in to default upload fields
    urlField,
    {
      name: 'sizes',
      type: 'group',
      fields: [
        {
          name: 'square',
          type: 'group',
          fields: [urlField],
        },
      ],
    },
  ],
}
