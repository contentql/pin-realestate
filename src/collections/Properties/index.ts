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
              type: 'textarea',
              // Pass the Slate editor here and configure it accordingly
              // editor: slateEditor({
              //   admin: {
              //     elements: [
              //       // customize elements allowed in Slate editor here
              //       'h2',
              //       'h3',
              //       'h4',
              //       'link',
              //       'blockquote',
              //     ],
              //     leaves: [
              //       // customize leaves allowed in Slate editor here
              //       'bold',
              //       'italic',
              //     ],
              //   },
              // }),
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'propertyType',
                  type: 'select',
                  //relationTo: ['propertyType'],
                  hasMany: false,
                  options: ['For sale', 'For rent'],
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

        // Media Details

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
                },
                {
                  name: 'maplocation',
                  type: 'text',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'city',
                      type: 'text',
                    },
                    {
                      name: 'state',
                      type: 'text',
                    },
                    {
                      name: 'country',
                      type: 'text',
                    },

                    {
                      name: 'zipcode',
                      type: 'text',
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

                      label: 'Year Built',
                    },
                    {
                      name: 'rooms',
                      type: 'number',

                      label: 'Rooms',
                    },
                    {
                      name: 'baths',
                      type: 'number',

                      label: 'Baths',
                    },
                    {
                      name: 'beds',
                      type: 'number',

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

                      label: 'Garages',
                    },
                    {
                      name: 'garagesSize',

                      type: 'number',

                      label: 'Garages area',
                    },
                    {
                      name: 'homearea',

                      type: 'number',

                      label: 'Home Area',
                    },
                    {
                      name: 'lotarea',
                      type: 'number',

                      label: 'Lot Area',
                    },
                  ],
                },
                {
                  name: 'material',
                  type: 'select',

                  label: 'Material',
                  options: ['Wood', 'Block', 'Brick', 'Rock'],
                  hasMany: false,
                },
              ],
            },
          ],
        },

        //Floors

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
                'Attic',
                'Basketball court',
                'Air Conditioning',
                'Lawn',
                'Swimming Pool',
                'Barbeque',
                'Microwave',
                'TV Cable',
                'Dryer',
                'Outdoor Shower',
                'Washer',
                'Gym',
                'Ocean view',
                'Private space',
                'Lake view',
                'Wine cellar',
                'Front yard',
                'Refrigerator',
                'WiFi',
                'Laundry',
                'Sauna',
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Properties
