import styled from "styled-components";
import { FieldNoteType, MediaRatioType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import { useState, useEffect } from "react";
import { formatYear, formatDate } from "../../../utils/date";
import MediaStack from "../../common/MediaStack";

const FieldNoteHeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${pxToRem(100)};
  height: 100vh;
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }
`;

const Inner = styled.div`
  height: 100vh;
  padding: ${pxToRem(100)} 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(80)} 0 ${pxToRem(50)};
    gap: ${pxToRem(50)};
  }
`;

const ContentWrapper = styled.div`
  .layout-grid {
    align-items: center;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      grid-row-gap: ${pxToRem(50)};
    }
  }
`;

const Left = styled.div`
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const SmallTitle = styled.p`
  text-align: center;
  text-transform: uppercase;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Categories = styled.div``;

const Category = styled.span`
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Middle = styled.div`
  grid-column: span 4;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Title = styled.p`
  text-align: center;

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    &.type-h1 {
      font-size: ${pxToRem(28)};
      line-height: ${pxToRem(26)};
    }
  }
`;

const Right = styled.div`
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Date = styled.span`
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const MediaWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex: unset;
    width: 80%;
    margin: 0 auto;
    align-items: flex-end;
    max-height: 70%;
    overflow: hidden;
  }
`;

const convertRatioToAspectRatio = (ratio: string): string => {
  if (!ratio) return "1/1";
  const decimal = parseInt(ratio) / 100;
  return `1/${decimal}`;
};

const MediaInner = styled.div<{ $ratio: string }>`
  height: 100%;
  position: relative;
  aspect-ratio: ${(props) => convertRatioToAspectRatio(props.$ratio)};
  width: auto;
  max-width: 100%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    height: auto;
    width: 100%;
  }

  .media-stack {
    height: 100%;
    width: 100%;

    * {
      height: 100%;
      width: 100%;
    }
  }
`;

const MediaCaption = styled.p`
  padding-top: ${pxToRem(10)};

  span {
    margin-right: ${pxToRem(20)};
  }
`;

type Props = {
  categories: FieldNoteType["categories"];
  date: FieldNoteType["date"];
  season: FieldNoteType["season"];
  title: FieldNoteType["title"];
  heroMedia: FieldNoteType["heroMedia"];
  heroMediaRatio: FieldNoteType["heroMediaRatio"];
  heroMediaCaption: FieldNoteType["heroMediaCaption"];
  numeralIndex: FieldNoteType["numeralIndex"];
};
const FieldNoteHeader = (props: Props) => {
  const {
    categories,
    date,
    season,
    title,
    heroMedia,
    heroMediaRatio,
    heroMediaCaption,
    numeralIndex,
  } = props;

  const hasCategories = categories && categories?.length > 0;

  const [formattedYear, setFormattedYear] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedYear(formatYear(date));
    setFormattedDate(formatDate(date));
  }, [date]);

  return (
    <FieldNoteHeaderWrapper>
      <LayoutWrapper>
        <Inner>
          <ContentWrapper>
            <LayoutGrid>
              <Left className="field-note-card__top">
                {hasCategories && (
                  <>
                    <SmallTitle className="type-h5 uppercase">
                      Categories
                    </SmallTitle>
                    <Categories>
                      {categories?.map((category) => (
                        <Category className="type-h5" key={category?.name}>
                          {category?.name}
                          {categories?.indexOf(category) !==
                            categories.length - 1 && ", "}
                        </Category>
                      ))}
                    </Categories>
                  </>
                )}
              </Left>
              <Middle>
                <Title className="type-h1">{numeralIndex || ""}.</Title>
                <Title className="type-h1">{title || ""}</Title>
                <Title className="type-h1">
                  {season || ""}, {formattedYear}
                </Title>
              </Middle>
              <Right className="field-note-card__bottom">
                <SmallTitle className="type-h5 uppercase">Date</SmallTitle>
                <Categories>
                  <Date className="type-h5">{formattedDate}</Date>
                </Categories>
              </Right>
            </LayoutGrid>
          </ContentWrapper>
          <MediaWrapper>
            <MediaInner $ratio={heroMediaRatio || "0"}>
              {heroMedia && <MediaStack data={heroMedia} isPriority={true} />}
              {heroMediaCaption && (
                <MediaCaption className="type-h6">
                  <span>I.</span>
                  {heroMediaCaption}
                </MediaCaption>
              )}
            </MediaInner>
          </MediaWrapper>
        </Inner>
      </LayoutWrapper>
    </FieldNoteHeaderWrapper>
  );
};

export default FieldNoteHeader;
