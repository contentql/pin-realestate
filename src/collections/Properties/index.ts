import { slateEditor } from '@payloadcms/richtext-slate'
import { CollectionConfig } from 'payload/types'

const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs', // required
      tabs: [
        // Products Details
        {
          name: 'propertiesDetails',
          label: 'Property Details', // required
          description: 'This will appear within the tab above the fields.',
          fields: [
            // required
            {
              name: 'title',
              type: 'text',
              label: 'Property Title',
            },

            {
              name: 'description',
              type: 'richText',
              // Pass the Slate editor here and configure it accordingly
              editor: slateEditor({
                admin: {
                  elements: [
                    // customize elements allowed in Slate editor here
                    'h2',
                    'h3',
                    'h4',
                    'link',
                    'blockquote',
                  ],
                  leaves: [
                    // customize leaves allowed in Slate editor here
                    'bold',
                    'italic',
                  ],
                },
              }),
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'propertyType',
                  type: 'relationship',
                  relationTo: ['propertyType'],
                  hasMany: false,
                  label: 'Type',
                },
                {
                  name: 'status',
                  type: 'select',
                  hasMany: true,
                  options: ['For sale', 'For rent'],
                  label: 'status',
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Price',
                },
              ],
            },
          ],
        },
        //
        {
          name: 'Nearby_places',
          label: 'Nearby places', // required
          description: 'This will appear within the tab above the fields.',
          fields: [
            {
              type: 'tabs',
              tabs: [
                {
                  name: 'education',
                  label: 'education places', // required
                  description:
                    'This will appear within the tab above the fields.',
                  fields: [
                    {
                      name: 'education',
                      type: 'array',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'name',
                              type: 'text',
                              label: 'Property Title',
                            },

                            {
                              name: 'grades',
                              type: 'text',
                              label: 'grades',
                            },
                            {
                              name: 'Distance',
                              type: 'text',
                              label: 'distance',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'medical',
                  label: 'Hospital/medical', // required
                  description:
                    'This will appear within the tab above the fields.',
                  fields: [
                    {
                      name: 'medical',
                      type: 'array',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'name',
                              type: 'text',
                              label: 'Hospital/medical name',
                            },

                            {
                              name: 'Distance',
                              type: 'text',
                              label: 'distance',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'transportation',
                  label: 'Transportation', // required
                  description:
                    'This will appear within the tab above the fields.',
                  fields: [
                    {
                      name: 'transportation',
                      type: 'array',
                      fields: [
                        {
                          type: 'row',
                          fields: [
                            {
                              name: 'name',
                              type: 'text',
                              label: 'tansportion name',
                            },

                            {
                              name: 'Distance',
                              type: 'text',
                              label: 'distance',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // Media Details
        {
          name: 'Media',

          label: 'property images', // required

          interfaceName: 'TabTwo', // optional (`name` must be present)
          fields: [
            // required
            {
              name: 'numberField', // accessible via tabTwo.numberField
              type: 'number',
              required: true,
            },
          ],
        },
        // Locations Details
        {
          name: 'location',
          label: 'Location', // required
          interfaceName: 'TabTwo', // optional (`name` must be present)
          fields: [
            // required
            {
              name: 'location',
              type: 'group',
              interfaceName: 'Location',
              fields: [
                {
                  name: 'address',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'maplocation',
                  type: 'text',
                  required: true,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'city',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'state',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'country',
                      type: 'text',
                      required: true,
                    },

                    {
                      name: 'zipcode',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'locationPoints',
                  type: 'point',
                  label: 'Location',
                },
              ],
            },
          ],
        },

        // Details

        {
          name: 'details',
          label: 'Details', // required
          interfaceName: 'DDetails', // optional (`name` must be present)
          fields: [
            // required
            {
              name: 'details',
              type: 'group',
              interfaceName: 'Details',
              fields: [
                {
                  name: 'label',
                  type: 'select',
                  options: ['Rented', 'Sold'],
                  label: 'Label',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'yearBuild',

                      type: 'number',
                      required: true,
                      label: 'Year Built',
                    },
                    {
                      name: 'rooms',
                      type: 'number',
                      required: true,
                      label: 'Rooms',
                    },
                    {
                      name: 'baths',
                      type: 'number',
                      required: true,
                      label: 'Baths',
                    },
                    {
                      name: 'beds',
                      type: 'number',
                      required: true,
                      label: 'Beds',
                    },
                  ],
                },

                {
                  type: 'row',
                  fields: [
                    {
                      name: 'garages',

                      type: 'number',
                      required: true,
                      label: 'Garages',
                    },
                    {
                      name: 'garagesSize',

                      type: 'number',
                      required: true,
                      label: 'Garages area',
                    },
                    {
                      name: 'homearea',

                      type: 'number',
                      required: true,
                      label: 'Home Area',
                    },
                    {
                      name: 'lotarea',
                      type: 'number',
                      required: true,
                      label: 'Lot Area',
                    },
                  ],
                },
                {
                  name: 'material',
                  type: 'select',
                  required: true,
                  label: 'Material',
                  options: ['Wood', 'Block', 'Brick', 'Rock'],
                  hasMany: false,
                },
              ],
            },
          ],
        },

        //Floors

        {
          name: 'floors',
          label: 'Floors', // required
          interfaceName: 'TabTwo', // optional (`name` must be present)
          fields: [
            // required
            {
              name: 'floors', // required
              type: 'array', // required
              label: 'Floors',
              minRows: 0,
              maxRows: 100,
              interfaceName: 'CardSlider', // optional
              labels: {
                singular: 'Floor',
                plural: 'Floors',
              },
              fields: [
                // required
                {
                  name: 'imageSrc',
                  label: 'Floor image',
                  type: 'upload',
                  relationTo: 'media',
                },

                {
                  type: 'row',
                  fields: [
                    {
                      name: 'rooms',
                      type: 'number',
                      label: 'Rooms',
                      required: true,
                    },
                    {
                      name: 'baths',
                      type: 'number',
                      label: 'Baths',
                      required: true,
                    },
                    {
                      name: 'bedrooms',
                      type: 'number',
                      label: 'Bedrooms',
                      required: true,
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'price',
                      type: 'number',
                      label: 'Price',
                      required: true,
                    },
                    {
                      name: 'size',
                      type: 'number',
                      label: 'Size',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'content',
                  type: 'textarea',
                  label: 'Content',
                  required: true,
                },
              ],
            },
          ],
        },
        //Amenities
        {
          name: 'amenities',
          label: 'Amenities', // required
          interfaceName: 'TabTwo', // optional (`name` must be present)
          fields: [
            // required
            {
              name: 'amenities',
              type: 'select',
              hasMany: true,
              label: 'Amenities',
              options: [
                'Air Conditioning',
                'Bar',
                'Bathtub',
                'Barbeque',
                'Dryer',
                'Gym',
                'Lawn',
                'Microwave',
                'Swimming Pool',
                'Washer',
                'Wifi',
              ],
            },
          ],
        },
        {
          name: 'facilities',
          label: 'Facilities', // required
          interfaceName: 'TabTwo', // optional (`name` must be present)
          fields: [
            // required

            {
              name: 'facilities', // required
              type: 'array', // required
              label: 'Facilities',
              minRows: 2,
              maxRows: 10,
              interfaceName: 'CardSlider', // optional
              labels: {
                singular: 'Facilitie',
                plural: 'Facilities',
              },
              fields: [
                // required
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Key',
                    },
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Value',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Properties
