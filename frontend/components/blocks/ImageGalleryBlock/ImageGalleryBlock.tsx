import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { ImageGalleryBlock as ImageGalleryBlockType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import GallerySidebar from "../../elements/GallerySidebar";
import GalleryMain from "../../elements/GalleryMain";
import { useState } from "react";
import GallerySidebarMobile from "../../elements/GallerySidebarMobile";
const ImageGalleryBlockWrapper = styled.section`
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }
`;

type Props = ImageGalleryBlockType;

const ImageGalleryBlock = (props: Props) => {
  const { imageGalleryBlockPB } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const { galleryItems } = imageGalleryBlockPB;

  const hasGalleryItems = galleryItems && galleryItems.length > 0;

  return (
    <>
      {hasGalleryItems && (
        <ImageGalleryBlockWrapper>
          <LayoutWrapper>
            <LayoutGrid>
              <GallerySidebar
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                galleryItems={galleryItems}
              />
              <GalleryMain
                activeIndex={activeIndex}
                galleryItems={galleryItems}
              />
            </LayoutGrid>
          </LayoutWrapper>
          <GallerySidebarMobile
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            galleryItems={galleryItems}
          />
        </ImageGalleryBlockWrapper>
      )}
    </>
  );
};

export default ImageGalleryBlock;
