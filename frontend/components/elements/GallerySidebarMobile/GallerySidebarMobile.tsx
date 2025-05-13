import styled from "styled-components";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { ImageGalleryBlock } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import MediaStack from "../../common/MediaStack";
import useViewportWidth from "../../../hooks/useViewportWidth";

const GallerySidebarMobileWrapper = styled.div`
  display: none;
  width: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: block;
  }
`;

const EmblaContainer = styled.div`
  overflow: hidden;
  width: 100%;
  padding-left: ${pxToRem(15)};
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const EmblaSlide = styled.div<{ $isActive: boolean }>`
  flex: 0 0 25%;
  min-width: 25%;
  position: relative;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
  border: 1px solid;
  border-color: ${({ $isActive }) =>
    $isActive ? "var(--colour-primary)" : "transparent"};
  margin-right: ${pxToRem(5)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 1;
  }

  .media-wrapper {
    padding-top: 125%;
  }
`;

type Props = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  galleryItems: ImageGalleryBlock["imageGalleryBlockPB"]["galleryItems"];
};

const GallerySidebarMobile = (props: Props) => {
  const { activeIndex, setActiveIndex, galleryItems } = props;

  const viewport = useViewportWidth();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  useEffect(() => {
    if (viewport !== "mobile" && viewport !== "tablet-portrait") return;

    if (emblaApi) {
      emblaApi.scrollTo(activeIndex);
    }
  }, [emblaApi, activeIndex, viewport]);

  useEffect(() => {
    if (viewport !== "mobile" && viewport !== "tablet-portrait") return;

    if (emblaApi) {
      emblaApi.on("select", () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
        emblaApi.scrollTo(activeIndex);
      });
    }
  }, [emblaApi, setActiveIndex, viewport]);

  return (
    <GallerySidebarMobileWrapper>
      <EmblaContainer>
        <EmblaViewport ref={emblaRef}>
          <div style={{ display: "flex" }}>
            {galleryItems.map((item, i) => (
              <EmblaSlide
                key={i}
                $isActive={activeIndex === i}
                onClick={() => setActiveIndex(i)}
              >
                {item?.media && <MediaStack data={item.media} />}
              </EmblaSlide>
            ))}
          </div>
        </EmblaViewport>
      </EmblaContainer>
    </GallerySidebarMobileWrapper>
  );
};

export default GallerySidebarMobile;
