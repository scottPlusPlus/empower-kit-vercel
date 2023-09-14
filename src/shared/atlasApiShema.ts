import { minLength, object, type Output, parse, string, array, maxLength, nullable } from 'valibot'; // 0.76 kB

// Create login schema with email and password
export const TermsSchema = object({
  user: string(),
  terms: array(string([minLength(2), maxLength(32)])),
});

// Infer output TypeScript type of login schema
export type TermsData = Output<typeof TermsSchema>; 


export const WebsiteInfoSchema = object({
  url: string(),
  fullUrl: string(),
  title: string(),
  summary: string(),
  image: string(),
  contentType: nullable(string()),
});

export type WebsiteInfoT = Output<typeof WebsiteInfoSchema>; 

export const AtlasCreatorSchema = object({
  twitterHandle: string(),
  twitterName: string(),
  twitterProfile: string(),
  twitterProfileImage: string(),
  project: WebsiteInfoSchema,
});

export type AtlasCreatorT = Output<typeof AtlasCreatorSchema>; 