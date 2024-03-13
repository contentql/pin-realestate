import { CollectionConfig } from 'payload/types'
import isAdminOrCreatedBy from '../../access/isCreatedBy'

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
          interfaceName: 'propertiesDetails',
          label: 'Property details', // required
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
        {
          name: 'media',

          label: 'Property images', // required

          interfaceName: 'media', // optional (`name` must be present)
          fields: [
            // required
            {
              name: 'propertyImages', // accessible via tabTwo.numberField
              type: 'array',
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },

        // Locations Details
        {
          name: 'location',
          label: 'Location', // required
          interfaceName: 'location', // optional (`name` must be present)
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

        //Nearby places

        {
          name: 'Nearby_places',
          interfaceName: 'Nearby_places',
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
                              name: 'distance',
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

        // Details

        {
          name: 'details',
          label: 'Details', // required
          interfaceName: 'details', // optional (`name` must be present)
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

        // User Details

        {
          name: 'owner',
          label: 'Owner details', // required
          // optional (`name` must be present)
          interfaceName: 'owner',
          fields: [
            // required
            {
              name: 'userDetails',
              type: 'group',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'userName',

                      type: 'text',

                      label: 'Name',
                    },
                    {
                      name: 'phoneNumber',
                      type: 'text',

                      label: 'Phone Number',
                    },
                    {
                      name: 'whatsAppNumber',
                      type: 'text',

                      label: 'Whats App',
                    },
                    {
                      name: 'userEmail',
                      type: 'text',

                      label: 'Email',
                    },
                  ],
                },
              ],
            },
          ],
        },

        //Floors

        {
          name: 'floors',
          label: 'Floors', // required
          interfaceName: 'floors', // optional (`name` must be present)
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
                      name: 'floorRooms',
                      type: 'number',
                      label: 'Rooms',
                      required: true,
                    },
                    {
                      name: 'floorBaths',
                      type: 'number',
                      label: 'Baths',
                      required: true,
                    },
                    {
                      name: 'floorBeds',
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
                      name: 'floorPrice',
                      type: 'number',
                      label: 'Price',
                      required: true,
                    },
                    {
                      name: 'floorSize',
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
          interfaceName: 'amenities', // optional (`name` must be present)
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

    //user relationships
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: data => Boolean(data?.createdBy),
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        console.log('test', req, operation, data)

        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id
            return data
          }
        }
      },
    ],
  },
  access: {
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
}

export default Properties
