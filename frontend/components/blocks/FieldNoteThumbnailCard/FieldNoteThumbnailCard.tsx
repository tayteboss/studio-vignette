import styled from "styled-components";
import MediaStack from "../../common/MediaStack";
import { FieldNoteType } from "../../../shared/types/types";
import { useEffect, useState } from "react";
import { formatYear, formatDate } from "../../../utils/date";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import pxToRem from "../../../utils/pxToRem";

const FieldNoteThumbnailCardWrapper = styled.div<{
  $inView: boolean;
  $isViewed: boolean;
}>`
  grid-column: span 4;
  width: 100%;
  position: relative;
  border: 1px solid var(--colour-primary);
  opacity: ${(props) => (props.$isViewed ? 0.7 : 1)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }

  &:hover {
    * {
      color: var(--colour-cream);
    }

    .field-note-card__media {
      opacity: 1;
    }

    .field-note-card__top {
      opacity: 1;
    }

    .field-note-card__bottom {
      opacity: 1;
    }
  }
`;

const MediaWrapper = styled.div<{ $ratio: string; $inView: boolean }>`
  width: 100%;
  opacity: 0;
  position: relative;

  transition: all var(--transition-speed-default) var(--transition-ease);

  .media-wrapper {
    padding-top: ${({ $ratio }) => $ratio};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--colour-primary);
    mix-blend-mode: multiply;
    opacity: 0.5;
    z-index: 1;
  }

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    opacity: ${(props) => (props.$inView ? 1 : 0)};
  }
`;

const ContentWrapper = styled.div<{ $inView: boolean }>`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    * {
      color: ${(props) =>
        props.$inView ? "var(--colour-cream)" : "var(--colour-primary)"};
    }
  }
`;

const Top = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    opacity: 1;
  }
`;

const SmallTitle = styled.p`
  text-align: center;
  text-transform: uppercase;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Categories = styled.div`
  height: 15px;
`;

const Category = styled.span`
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Middle = styled.div``;

const Title = styled.p`
  text-align: center;

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    &.type-h3 {
      font-size: ${pxToRem(20)};
      line-height: ${pxToRem(23)};
      letter-spacing: -0.4px;
    }
  }
`;

const Bottom = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    opacity: 1;
  }
`;

const Date = styled.span`
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

type Props = {
  date: FieldNoteType["date"];
  heroMedia: FieldNoteType["heroMedia"];
  heroMediaRatio: FieldNoteType["heroMediaRatio"];
  title: FieldNoteType["title"];
  slug: FieldNoteType["slug"];
  numeralIndex: FieldNoteType["numeralIndex"];
  season: FieldNoteType["season"];
  categories: FieldNoteType["categories"];
  isViewed?: boolean;
};

const FieldNoteThumbnailCard = (props: Props) => {
  const {
    date,
    heroMedia,
    heroMediaRatio,
    title,
    slug,
    numeralIndex,
    season,
    categories,
    isViewed = false,
  } = props;

  const [formattedYear, setFormattedYear] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedYear(formatYear(date));
    setFormattedDate(formatDate(date));
  }, [date]);

  const hasCategories = categories && categories.length > 0;

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.9,
  });

  return (
    <FieldNoteThumbnailCardWrapper
      className="field-note-card"
      ref={ref}
      $inView={inView}
      $isViewed={isViewed}
    >
      <Link href={`/field-notes/${slug.current}`}>
        <MediaWrapper
          className="field-note-card__media"
          $ratio={heroMediaRatio || "100%"}
          $inView={inView}
        >
          {heroMedia && <MediaStack data={heroMedia} />}
        </MediaWrapper>
        <ContentWrapper $inView={inView}>
          <Top className="field-note-card__top">
            {hasCategories && (
              <>
                <SmallTitle className="type-small">Categories</SmallTitle>
                <Categories>
                  {categories?.map((category) => (
                    <Category className="type-small" key={category?.name}>
                      {category?.name}
                      {categories?.indexOf(category) !==
                        categories.length - 1 && ", "}
                    </Category>
                  ))}
                </Categories>
              </>
            )}
          </Top>
          <Middle>
            <Title className="type-h3">{numeralIndex || ""}.</Title>
            <Title className="type-h3">{title || ""}</Title>
            <Title className="type-h3">
              {season || ""}, {formattedYear}
            </Title>
          </Middle>
          <Bottom className="field-note-card__bottom">
            <SmallTitle className="type-small">Date</SmallTitle>
            <Categories>
              <Date className="type-small">{formattedDate}</Date>
            </Categories>
          </Bottom>
        </ContentWrapper>
      </Link>
    </FieldNoteThumbnailCardWrapper>
  );
};

export default FieldNoteThumbnailCard;
