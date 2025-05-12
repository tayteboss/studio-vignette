import styled from "styled-components";
import { FieldNoteType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import FieldNoteCard from "../FieldNoteCard";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";

const HomeFieldNotesWrapper = styled.section`
  padding-top: 60vh;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: 80vh;
  }

  .layout-grid {
    &:nth-child(5n + 1) {
      .field-note-card {
        grid-column: 8 / 12;

        @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
          grid-column: 4 / -1;
        }
      }
    }

    &:nth-child(5n + 2) {
      .field-note-card {
        grid-column: 4 / 9;

        @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
          grid-column: 1 / 5;
        }
      }
    }

    &:nth-child(5n + 3) {
      .field-note-card {
        grid-column: 1 / 6;

        @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
          grid-column: 4 / -1;
        }
      }
    }

    &:nth-child(5n + 4) {
      .field-note-card {
        grid-column: 6 / -1;

        @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
          grid-column: 2 / -2;
        }
      }
    }

    &:nth-child(5n + 5) {
      .field-note-card {
        grid-column: 4 / 9;

        @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
          grid-column: 4 / -2;
        }
      }
    }
  }
`;

type Props = {
  fieldNotes: FieldNoteType[];
  setHeroTitle: (fieldNote: FieldNoteType | string) => void;
  homeTitle: string;
  heroTitle: string | FieldNoteType;
};

const HomeFieldNotes = (props: Props) => {
  const {
    fieldNotes: initialFieldNotes,
    setHeroTitle,
    homeTitle,
    heroTitle,
  } = props;
  const [fieldNotes, setFieldNotes] =
    useState<FieldNoteType[]>(initialFieldNotes);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !wrapperRef.current) return;

    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const wrapper = wrapperRef.current;
      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapperRect.height;
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollTop + viewportHeight > wrapperHeight - viewportHeight) {
        setFieldNotes((prev) => [...prev, ...initialFieldNotes]);
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, initialFieldNotes]);

  const hasFieldNotes = fieldNotes && fieldNotes.length > 0;

  return (
    <HomeFieldNotesWrapper ref={wrapperRef}>
      <LayoutWrapper>
        {hasFieldNotes &&
          fieldNotes.map((fieldNote, index) => (
            <LayoutGrid key={`${fieldNote.title}-${index}`}>
              <FieldNoteCard
                fieldNote={fieldNote}
                homeTitle={homeTitle}
                heroTitle={heroTitle}
                setHeroTitle={setHeroTitle}
              />
            </LayoutGrid>
          ))}
      </LayoutWrapper>
    </HomeFieldNotesWrapper>
  );
};

export default HomeFieldNotes;
