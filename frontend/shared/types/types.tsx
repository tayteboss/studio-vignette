export type MediaType = {
  mediaType: "video" | "image";
  video: { asset: { playbackId: string } };
  image: { asset: { url: string; metadata: { lqip: string } }; alt: string };
};

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

export type SiteSettingsType = {
  referenceTitle: string;
  address: string;
  addressUrl: string;
  email: string;
  phone: string;
  instagramUrl: string;
  facebookUrl: string;
  credits: {
    title: string;
    url: string;
  }[];
};

export type HomePageType = {
  seoTitle: string;
  seoDescription: string;
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
  media: MediaType;
  mediaIdentifiers: {
    title: string;
    url: string;
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
    content: string;
    media?: MediaType;
    figureNumber?: string;
    title?: string;
    caption?: string;
    url?: string;
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
    mediaItems: Array<{
      media: MediaType;
      figureNumber?: string;
      caption?: string;
    }>;
    mediaRatio: "100%" | "125%" | "66.66%";
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
    }>;
  };
};

export type PageBuilderBlock =
  | HeadingBlock
  | ContentBlock
  | ImageGalleryBlock
  | MediaBlock
  | ProductGalleryBlock
  | ConsiderationsBlock;

export type FieldNoteType = {
  title: string;
  slug: SlugType;
  date: string;
  heroMedia: MediaType;
  heroMediaCaption: string;
  pageBuilder: PageBuilderBlock[];
};
