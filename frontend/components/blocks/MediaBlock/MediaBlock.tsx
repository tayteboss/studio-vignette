import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import {
  MediaBlock as MediaBlockType,
  MediaRatioType,
} from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import MediaStack from "../../common/MediaStack";

const MediaBlockWrapper = styled.section`
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }
`;

const MediaWrapper = styled.div<{ $isPortrait: boolean }>`
  width: 100%;
  position: relative;
  grid-column: ${(props) => (props.$isPortrait ? "5 / -5" : "3 / -3")};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: ${(props) => (props.$isPortrait ? "2 / -2" : "1 / -1")};
  }
`;

const MediaInner = styled.div<{ $ratio: MediaRatioType }>`
  width: 100%;
  position: relative;

  .media-wrapper {
    padding-top: ${({ $ratio }) => $ratio};
  }
`;

const CaptionWrapper = styled.div`
  padding-top: ${pxToRem(10)};
  display: flex;
  align-items: center;
  gap: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: ${pxToRem(5)};
    gap: ${pxToRem(10)};
  }
`;

type Props = MediaBlockType;

const MediaBlock = (props: Props) => {
  const { mediaBlockPB } = props;

  const { media, mediaRatio, figureNumber, caption } = mediaBlockPB;

  return (
    <MediaBlockWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          <MediaWrapper $isPortrait={parseInt(mediaRatio) >= 100}>
            <MediaInner $ratio={mediaRatio}>
              {media && <MediaStack data={media} />}
              <CaptionWrapper>
                {figureNumber && (
                  <span className="type-h6">{figureNumber}.</span>
                )}
                {caption && <span className="type-h6">{caption}</span>}
              </CaptionWrapper>
            </MediaInner>
          </MediaWrapper>
        </LayoutGrid>
      </LayoutWrapper>
    </MediaBlockWrapper>
  );
};

export default MediaBlock;
