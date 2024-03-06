import type { CollectionConfig } from "payload/types";

const PropertyType: CollectionConfig = {
  fields: [
    {
      name: "type",
      type: "text",
    },
  ],
  slug: "propertyType",
  admin: {
    useAsTitle: "type",
  },
};

export default PropertyType;
