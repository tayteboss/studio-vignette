export type MediaType = {
  mediaType: "video" | "image";
  video: { asset: { playbackId: string } };
  image: { asset: { url: string; metadata: { lqip: string } }; alt: string };
};

export type MediaRatioType =
  | "100%"
  | "150%"
  | "125%"
  | "80%"
  | "66.66%"
  | "56.25%";

export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type ButtonType = {
  url: string;
  pageReference: {
    _ref: string;
  };
  title: string;
};

export type SlugType = {
  current: string;
};

export type SocialLinkType = {
  socialTitle: string;
  socialLink: string;
};

export type SiteSettingsType = {
  referenceTitle: string;
  address: string;
  addressUrl: string;
  email: string;
  phone: string;
  instagramUrl: string;
  instagramUsername: string;
  facebookUrl: string;
  credits: {
    credit: string;
    title: string;
    link: string;
  }[];
};

export type HomePageType = {
  seoTitle: string;
  seoDescription: string;
  title: string;
};

export type FieldNotesPageType = {
  seoTitle: string;
  seoDescription: string;
};

export type InformationPageType = {
  seoTitle: string;
  seoDescription: string;
  profileText: string;
  careersText: string;
  socialLinks: SocialLinkType[];
  media: MediaType;
  mediaIdentifiers: {
    position: string;
    name: string;
    role: string;
  }[];
};

export type HeadingBlock = {
  component: "headingBlockPB";
  headingBlockPB: {
    subheading?: string;
    heading: string;
  };
};

export type ContentBlock = {
  component: "contentBlockPB";
  contentBlockPB: {
    subheading?: string;
    contentBlock: Array<{
      content?: string;
      media?: MediaType;
      mediaRatio?: MediaRatioType;
      figureNumber?: string;
      title?: string;
      caption?: string;
      url?: string;
    }>;
    heroMedia?: MediaType;
    heroMediaRatio?: MediaRatioType;
    heroMediaFigureNumber?: string;
    heroMediaTitle?: string;
    heroMediaCaption?: string;
  };
};

export type ImageGalleryBlock = {
  component: "imageGalleryBlockPB";
  imageGalleryBlockPB: {
    galleryItems: Array<{
      media: MediaType;
      figureNumber?: string;
      title?: string;
      caption?: string;
      url?: string;
    }>;
  };
};

export type MediaBlock = {
  component: "mediaBlockPB";
  mediaBlockPB: {
    media: MediaType;
    mediaRatio: MediaRatioType;
    figureNumber?: string;
    caption?: string;
  };
};

export type ProductGalleryBlock = {
  component: "productGalleryBlockPB";
  productGalleryBlockPB: {
    products: Array<{
      media: MediaType;
      title: string;
      description?: string;
      url?: string;
    }>;
  };
};

export type ConsiderationsBlock = {
  component: "considerationsBlockPB";
  considerationsBlockPB: {
    title: string;
    considerations: Array<{
      title: string;
      description: string;
      image: {
        asset: {
          url: string;
        };
      };
      imageRatio: MediaRatioType;
    }>;
  };
};

export type TestimonialBlock = {
  component: "testimonialBlockPB";
  testimonialBlockPB: {
    quote: string;
    figureNumber?: string;
    authorAndDate: string;
  };
};

export type PageBuilderBlock =
  | HeadingBlock
  | ContentBlock
  | ImageGalleryBlock
  | MediaBlock
  | ProductGalleryBlock
  | ConsiderationsBlock
  | TestimonialBlock;

export type FieldNoteType = {
  title: string;
  slug: SlugType;
  categories?: {
    name: string;
  }[];
  numeralIndex: string;
  date: string;
  season: "Spring" | "Summer" | "Autumn" | "Winter";
  heroMedia: MediaType;
  heroMediaRatio?: MediaRatioType;
  heroMediaCaption: string;
  pageBuilder: PageBuilderBlock[];
};
