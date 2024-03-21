/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    media: Media;
    properties: Property;
    tags: Tag;
    contact: Contact;
    propertyType: PropertyType;
    wishlist: Wishlist;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  user_name?: string | null;
  roles?: ('admin' | 'user' | 'seller')[] | null;
  phone_number?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  position?: string | null;
  language?: string | null;
  company?: string | null;
  tax_number?: string | null;
  address?: string | null;
  about?: string | null;
  profile_pic?: string | Media | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    square?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    sixteenByNineMedium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    userProfileCircleImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    userTestimonialImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    propertyImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    featuredPropertyImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    agentImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    aboutHeroImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    aboutImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    aboutLearnMoreImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    myPropertyImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    propertyGalleryImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    floorImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    propertyAgentImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    userPropertyReviewImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    reviewPropertyImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "properties".
 */
export interface Property {
  id: string;
  _propertyDetails: {
    title: string;
    description: string;
    type: 'apartment' | 'villa' | 'bungalow' | 'office';
    saleType: ('sale' | 'rent')[];
    price: number;
  };
  _assets: {
    allMedia?:
      | {
          asset?: string | Media | null;
          id?: string | null;
        }[]
      | null;
  };
  _location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
  _details: {
    available: boolean;
    yearBuild: number;
    rooms: number;
    bathrooms: number;
    bedrooms: number;
    garages: number;
    garagesSize?: number | null;
    homearea?: number | null;
    lotarea?: number | null;
    material?: ('Wood' | 'Block' | 'Brick' | 'Rock') | null;
  };
  _owner: {
    name: string;
    email?: string | null;
    mobileNumber?: string | null;
    whatsAppNumber?: string | null;
  };
  _floors: {
    floors?:
      | {
          floorImage?: string | Media | null;
          floorRooms: number;
          floorBaths: number;
          floorBeds: number;
          floorPrice: number;
          floorSize: number;
          floorDescription: string;
          id?: string | null;
        }[]
      | null;
  };
  _amenities: {
    amenities: (
      | 'Attic'
      | 'Basketball court'
      | 'Air Conditioning'
      | 'Lawn'
      | 'Swimming Pool'
      | 'Barbeque'
      | 'Microwave'
      | 'TV Cable'
      | 'Dryer'
      | 'Outdoor Shower'
      | 'Washer'
      | 'Gym'
      | 'Ocean view'
      | 'Private space'
      | 'Lake view'
      | 'Wine cellar'
      | 'Front yard'
      | 'Refrigerator'
      | 'WiFi'
      | 'Laundry'
      | 'Sauna'
    )[];
  };
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  createdBy?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string;
  tag?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact".
 */
export interface Contact {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  query?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "propertyType".
 */
export interface PropertyType {
  id: string;
  type?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "wishlist".
 */
export interface Wishlist {
  id: string;
  wishlistProperties?:
    | {
        relationTo: 'properties';
        value: string | Property;
      }[]
    | null;
  user?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}