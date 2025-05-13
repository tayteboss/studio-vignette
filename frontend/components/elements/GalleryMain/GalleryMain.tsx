import styled from "styled-components";
import { ImageGalleryBlock } from "../../../shared/types/types";
import { useEffect, useState } from "react";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";
import { motion, AnimatePresence } from "framer-motion";

const GalleryMainWrapper = styled.div`
  grid-column: 5 / -1;
  display: flex;
  align-items: flex-end;
  gap: ${pxToRem(20)};
  background: var(--colour-primary);
  padding: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    margin-bottom: ${pxToRem(10)};
    flex-direction: column-reverse;
    justify-content: space-between;
    gap: ${pxToRem(100)};
    padding: ${pxToRem(15)};
    min-height: ${pxToRem(600)};
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(10)};
  padding-top: ${pxToRem(10)};
  flex: 1;
  width: 50%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 100%;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(10)};

  span {
    color: var(--colour-cream);
  }
`;

const MediaCaption = styled.p`
  color: var(--colour-cream);
  max-width: ${pxToRem(400)};
  width: 80%;
`;

const MediaOuterWrapper = styled.div`
  flex: 1;
  width: 50%;
  position: relative;
  background: var(--colour-cream);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 75%;
    background: transparent;
  }
`;

const MediaWrapper = styled(motion.div)`
  background: var(--colour-cream);

  .media-wrapper {
    padding-top: 125%;
  }
`;

type Props = {
  activeIndex: number;
  galleryItems: ImageGalleryBlock["imageGalleryBlockPB"]["galleryItems"];
};

const GalleryMain = (props: Props) => {
  const { activeIndex, galleryItems } = props;

  const [activeItem, setActiveItem] = useState(galleryItems[activeIndex]);

  useEffect(() => {
    setActiveItem(galleryItems[activeIndex]);
  }, [activeIndex, galleryItems]);

  return (
    <GalleryMainWrapper>
      <AnimatePresence mode="wait">
        <ContentWrapper
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeItem?.caption && (
            <ContentHeader className="type-h6">
              {activeItem?.figureNumber && (
                <span>{activeItem?.figureNumber}.</span>
              )}
              {activeItem?.title && <span>{activeItem?.title}</span>}
            </ContentHeader>
          )}
          {activeItem?.caption && (
            <MediaCaption className="type-h6">
              {activeItem?.caption}
            </MediaCaption>
          )}
        </ContentWrapper>
      </AnimatePresence>
      <AnimatePresence>
        <MediaOuterWrapper>
          <MediaWrapper
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeItem?.media && <MediaStack data={activeItem?.media} />}
          </MediaWrapper>
        </MediaOuterWrapper>
      </AnimatePresence>
    </GalleryMainWrapper>
  );
};

export default GalleryMain;
