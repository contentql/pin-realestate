import { CollectionConfig } from "payload/types";

const Properties: CollectionConfig = {
  slug: "properties",
  fields: [
    {
      name: "title",
      type: "text",
      label: "title",
    },
    {
      name: "location",
      type: "text",
      label: "location",
    },
    {
      name: "city",
      type: "text",
      label: "city",
    },
    {
      name: "bed",
      type: "text",
      label: "Bed Rooms",
    },
    {
      name: "bath",
      type: "text",
      label: "Bathrooms",
    },
    {
      name: "forRent",
      type: "checkbox",
      label: "Rentable",
    },
    {
      name: "sqft",
      type: "number",
      label: "Area",
    },
    {
      name: "propertyType",
      type: "text",
      label: "property",
    },
    {
      name: "price",
      type: "text",
      label: "Price",
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Featured",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: ["tags"],
      hasMany: true,
      label: "Tag",
    },
    {
      name: "features",
      type: "select",
      hasMany: true,
      options: ["office", "house"],
      label: "features",
    },
  ],
};

export default Properties;

/*
title: "Equestrian Family Home",
    city: "New York",
    location: "New York City, CA, USA",
    bed: "1",
    bath: "2",
    sqft: 1200,
    price: "$14,000",
    forRent: false,
    tags: ["house", "office"],
    propertyType: "Houses",
    yearBuilding: 2018,
    featured: true,
    lat: 40.7279707552121,
    long: -74.07152705896405,
    features: [
      "Air Conditioning",
      "Lawn",
      "TV Cable",
      "Dryer",
      "Outdoor Shower",
      "Washer",
      "Lake view",
      "Wine cellar",
      "Front yard",
      "Refrigerator",
    ],
    */
