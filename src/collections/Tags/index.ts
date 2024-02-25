import type { CollectionConfig } from "payload/types";

const Tags: CollectionConfig = {
  fields: [
    {
      name: "tag",
      type: "text",
    },
  ],
  slug: "tags",
};

export default Tags;
