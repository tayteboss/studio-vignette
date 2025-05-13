import styled from "styled-components";
import {
  ContentBlock as ContentBlockType,
  MediaRatioType,
} from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import formatHTML from "../../../utils/formatHTML";
import MediaStack from "../../common/MediaStack";

const ContentBlockWrapper = styled.section`
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }

  .layout-grid {
    grid-row-gap: ${pxToRem(20)};
  }
`;

const Subheading = styled.h2`
  grid-column: span 4;
  position: sticky;
  top: ${pxToRem(50)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    position: relative;
    top: unset;
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(25)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Content = styled.div``;

const ContentSection = styled.div``;

const MediaSection = styled.div<{ $ratio: MediaRatioType }>`
  width: 100%;

  .media-wrapper {
    padding-top: ${({ $ratio }) => $ratio};
  }
`;

const MediaContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(10)};
`;

const MediaCaption = styled.p``;

const Caption = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(10)};
  padding-top: ${pxToRem(10)};
`;

const CaptionText = styled.p``;

const HeroMediaWrapper = styled.div<{ $ratio: MediaRatioType }>`
  grid-column: 11 / -1;
  width: 100%;
  position: sticky;
  top: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    position: relative;
    top: unset;

    .media-stack {
      width: 60%;
    }
  }

  .media-wrapper {
    padding-top: ${({ $ratio }) => $ratio};
  }
`;

const HeroMediaContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(10)};
  padding-top: ${pxToRem(10)};
`;

const MediaStackWrapper = styled.div`
  background: var(--colour-primary);
  padding: ${pxToRem(100)} ${pxToRem(80)};
`;

type Props = ContentBlockType;

const ContentBlock = (props: Props) => {
  const { contentBlockPB } = props;

  const {
    subheading,
    contentBlock,
    heroMedia,
    heroMediaRatio,
    heroMediaFigureNumber,
    heroMediaCaption,
    heroMediaTitle,
  } = contentBlockPB;

  const hasContent = contentBlock && contentBlock.length > 0;

  return (
    <ContentBlockWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          <Subheading className="type-small">{subheading || ""}</Subheading>
          <ContentWrapper>
            {hasContent &&
              contentBlock.map((section, index) => {
                const useContentSection = section.content;

                return useContentSection ? (
                  <ContentSection key={index}>
                    {section?.content && (
                      <Content
                        dangerouslySetInnerHTML={{
                          __html: formatHTML(section.content),
                        }}
                      />
                    )}
                  </ContentSection>
                ) : (
                  <MediaSection
                    key={index}
                    $ratio={section?.mediaRatio || "100%"}
                  >
                    {section?.media && (
                      <MediaStackWrapper>
                        <MediaStack data={section.media} />
                      </MediaStackWrapper>
                    )}
                    {section?.caption && (
                      <Caption>
                        {section?.figureNumber && (
                          <CaptionText className="type-h6">
                            {section?.figureNumber}.
                          </CaptionText>
                        )}
                        {section?.caption && (
                          <CaptionText className="type-h6">
                            {section?.caption}
                          </CaptionText>
                        )}
                      </Caption>
                    )}
                  </MediaSection>
                );
              })}
          </ContentWrapper>
          <HeroMediaWrapper $ratio={heroMediaRatio || "100%"}>
            {heroMedia && <MediaStack data={heroMedia} />}
            <HeroMediaContentWrapper>
              {heroMediaCaption && (
                <MediaContentHeader className="type-h6">
                  {heroMediaFigureNumber && (
                    <span>{heroMediaFigureNumber}.</span>
                  )}
                  {heroMediaTitle && <span>{heroMediaTitle}</span>}
                </MediaContentHeader>
              )}
              {heroMediaCaption && (
                <MediaCaption className="type-h6">
                  {heroMediaCaption}
                </MediaCaption>
              )}
            </HeroMediaContentWrapper>
          </HeroMediaWrapper>
        </LayoutGrid>
      </LayoutWrapper>
    </ContentBlockWrapper>
  );
};

export default ContentBlock;
