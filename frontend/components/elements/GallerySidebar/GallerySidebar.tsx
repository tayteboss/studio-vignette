import styled from "styled-components";
import { ImageGalleryBlock } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";

const GallerySidebarWrapper = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(5)};
  position: sticky;
  top: ${pxToRem(50)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const MediaWrapper = styled.div<{ $isActive: boolean }>`
  width: 100%;
  position: relative;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
  border: 1px solid;
  border-color: ${({ $isActive }) =>
    $isActive ? "var(--colour-primary)" : "transparent"};
  cursor: pointer;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 1;
  }

  .media-wrapper {
    padding-top: 100%;
  }
`;

type Props = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  galleryItems: ImageGalleryBlock["imageGalleryBlockPB"]["galleryItems"];
};

const GallerySidebar = (props: Props) => {
  const { activeIndex, setActiveIndex, galleryItems } = props;

  return (
    <GallerySidebarWrapper>
      {galleryItems.map((item, i) => (
        <MediaWrapper
          $isActive={activeIndex === i}
          onClick={() => setActiveIndex(i)}
        >
          {item?.media && <MediaStack data={item.media} />}
        </MediaWrapper>
      ))}
    </GallerySidebarWrapper>
  );
};

export default GallerySidebar;
