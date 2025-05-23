export const mediaString = `
	...,
	mediaType,
	image {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	video {
		asset-> {
			playbackId,
		},
	},
`;

export const pageBuilderBlockString = `
	component,
	headingBlockPB {
		subheading,
		heading
	},
	contentBlockPB {
		subheading,
		contentBlock[] {
			content,
			media {
				${mediaString}
			},
			mediaRatio,
			figureNumber,
			title,
			caption,
			url
		},
		heroMedia {
			${mediaString}
		},
		heroMediaRatio,
		heroMediaFigureNumber,
		heroMediaTitle,
		heroMediaCaption,
		heroMediaLink
	},
	imageGalleryBlockPB {
		galleryItems[] {
			media {
				${mediaString}
			},
			figureNumber,
			title,
			caption,
			url
		}
	},
	mediaBlockPB {
		media {
			${mediaString}
		},
		figureNumber,
		caption,
		mediaRatio
	},
	productGalleryBlockPB {
		products[] {
			image {
				asset-> {
					url
				}
			},
			title,
			description,
			link,
			features[] {
				title,
				value
			}
		}
	},
	considerationsBlockPB {
		subheading,
		considerations[] {
			title,
			description,
			image {
				asset-> {
					url
				}
			},
			imageRatio
		}
	},
	testimonialBlockPB {
		quote,
		figureNumber,
		authorAndDate
	}
`;

export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		referenceTitle,
		address,
		addressUrl,
		email,
		phone,
		instagramUrl,
		facebookUrl,
		credits[] {
			credit,
			title,
			link
		}
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		seoTitle,
		seoDescription,
		title
	}
`;

export const informationPageQueryString = `
	*[_type == 'informationPage'][0] {
		seoTitle,
		seoDescription,
		profileText,
		careersText,
		socialLinks[] {
			socialTitle,
			socialLink
		},
		media {
			${mediaString}
		},
		mediaIdentifiers[] {
			position,
			name,
			role
		}
	}
`;

export const fieldNotesPageQueryString = `
	*[_type == "fieldNotesPage"][0] {
		seoTitle,
		seoDescription
	}
`;

export const fieldNotesQueryString = `
	*[_type == 'fieldNote'] | order(date desc) [0...100] {
		title,
		slug,
		date,
		season,
		categories[]-> {
			name
		},
		heroMedia {
			${mediaString}
		},
		heroMediaRatio,
		heroMediaCaption,
		pageBuilder[] {
			${pageBuilderBlockString}
		}
	}
`;

export const fieldNotesQueryStringSimplified = `
	*[_type == 'fieldNote'] | order(date desc) [0...100] {
		title,
		slug,
		date,
		season,
		categories[]-> {
			name
		},
		heroMedia {
			${mediaString}
		},
		heroMediaRatio,
		heroMediaCaption,
	}
`;

export const fieldNotesCountQueryString = `
	count(*[_type == 'fieldNote'])
`;
