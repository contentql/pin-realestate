import { CollectionConfig } from 'payload/types'
import isAdminOrCreatedBy from '../../access/isCreatedBy'
import {
  NumberField,
  TelephoneField,
} from '@nouance/payload-better-fields-plugin'

const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Products Details
        {
          name: '_propertyDetails',
          interfaceName: 'PropertyDetails',
          label: 'Property Details', // required
          description: 'This tab is related to Property Details',
          fields: [
            {
              name: 'title',
              label: 'Property Title',
              type: 'text',
              required: true,
              admin: {
                description: 'Enter the Property Name',
                placeholder: 'Enter the Property Name',
              },
            },
            {
              name: 'description',
              label: 'Property Description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Enter the Property Description',
                placeholder: 'Enter the Property Description',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  label: 'Property Type',
                  type: 'select',
                  options: ['apartment', 'villa', 'bungalow', 'office'],
                  hasMany: false,
                  required: true,
                  admin: {
                    description: 'Contact the developer team to add new type',
                  },
                },
                {
                  name: 'saleType',
                  label: 'Property Sale Type',
                  type: 'select',
                  options: ['sale', 'rent'],
                  hasMany: true,
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                ...NumberField(
                  {
                    name: 'price',
                    label: 'Property Price',
                    required: true,
                    admin: {
                      description: 'Enter Price in Dollars',
                      placeholder: 'Enter Price in Dollars',
                    },
                  },
                  {
                    prefix: '$ ',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
              ],
            },
          ],
        },
        //

        // Media Details
        {
          name: '_assets',
          label: 'Assets',
          interfaceName: 'Assets',
          fields: [
            {
              name: 'allMedia',
              type: 'array',
              fields: [
                {
                  type: 'upload',
                  name: 'asset',
                  label: 'Asset',
                  relationTo: 'media',
                  admin: {
                    description:
                      'You can upload any type of media e.g: images, videos',
                  },
                },
              ],
            },
          ],
        },

        // Locations Details
        {
          name: '_location',
          label: 'Location',
          interfaceName: 'Location',
          fields: [
            {
              name: 'address',
              label: 'Address',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Enter complete address, it is used for locating your asset via google maps',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  label: 'City',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'state',
                  label: 'State',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'country',
                  label: 'Country',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'zipcode',
                  label: 'Zip Code',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        //Nearby places

        // Details
        {
          name: '_details',
          label: 'Details',
          interfaceName: 'Details',
          fields: [
            {
              name: 'available',
              type: 'checkbox',
              label: 'Available for Sale?',
              admin: {
                description:
                  'Based upon the availability we will display whether it is in sale or sold status',
              },
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'yearBuild',
                  type: 'number',
                  label: 'Year Built',
                  required: true,
                },
                {
                  name: 'rooms',
                  type: 'number',
                  label: 'Rooms',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'bathrooms',
                  type: 'number',
                  label: 'Bath Rooms',
                  required: true,
                },
                {
                  name: 'bedrooms',
                  type: 'number',
                  label: 'Bed Rooms',
                  required: true,
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
                  required: true,
                  defaultValue: 0,
                },
                {
                  name: 'garagesSize',
                  type: 'number',
                  label: 'Garages Area',
                },
              ],
            },
            {
              type: 'row',
              fields: [
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
              admin: {
                description:
                  'select the core material used for the construction',
              },
            },
          ],
        },

        // User Details
        {
          name: '_owner',
          label: 'Owner details',
          interfaceName: 'owner',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Owner Name',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'email',
                  label: 'Owner Email',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                ...TelephoneField({
                  name: 'mobileNumber',
                  label: 'Owner Mobile Number',
                  admin: {
                    placeholder: '+1 2133 734 253',
                  },
                }),
                ...TelephoneField({
                  name: 'whatsAppNumber',
                  label: "Owner's WhatsApp Number",
                  admin: {
                    placeholder: '+1 2133 734 253',
                  },
                }),
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

/*

Near By Places
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

*/
