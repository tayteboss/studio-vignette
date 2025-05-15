import styled from "styled-components";
import { FieldNoteType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import FieldNoteCard from "../FieldNoteCard";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useLenis } from "@studio-freight/react-lenis";

const HomeFieldNotesWrapper = styled.section`
  padding-top: 60vh;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding-top: 40vh;
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
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout>();
  const resizeTimerRef = useRef<NodeJS.Timeout>();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const autoScrollRef = useRef<number>();

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(
      () => {
        setIsAutoScrolling(true);
      },
      isMobile ? 5000 : 3000
    );
  }, [isMobile]);

  // Memoize the handleScroll callback
  const handleScroll = useCallback(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperHeight = wrapperRect.height;
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (scrollTop + viewportHeight > wrapperHeight - viewportHeight) {
      setFieldNotes((prev) => [...prev, ...initialFieldNotes]);
    }
  }, [initialFieldNotes]);

  // Memoize the autoScroll callback
  const autoScroll = useCallback(() => {
    if (!lenis) return;

    const currentSpeed = isHovering ? scrollSpeed * 0.3 : scrollSpeed;
    lenis.scrollTo(lenis.scroll + currentSpeed, {
      duration: 0,
      immediate: true,
    });

    autoScrollRef.current = requestAnimationFrame(autoScroll);
  }, [lenis, scrollSpeed, isHovering]);

  // Set scroll speed based on device type with debounce
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      resizeTimerRef.current = setTimeout(() => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        setScrollSpeed(mobile ? 2 : 2);
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, []);

  // Scroll event listener
  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", handleScroll);
    return () => lenis.off("scroll", handleScroll);
  }, [lenis, handleScroll]);

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !lenis) return;

    autoScrollRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, lenis, autoScroll]);

  // Handle user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      setIsAutoScrolling(false);
      resetInactivityTimer();
    };

    window.addEventListener("wheel", handleUserInteraction);
    window.addEventListener("touchstart", handleUserInteraction);
    window.addEventListener("touchmove", handleUserInteraction);

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  // Memoize the field notes list to prevent unnecessary re-renders
  const fieldNotesList = useMemo(() => {
    if (!fieldNotes || fieldNotes.length === 0) return null;

    return fieldNotes.map((fieldNote, index) => (
      <LayoutGrid key={`${fieldNote.title}-${index}`}>
        <FieldNoteCard
          fieldNote={fieldNote}
          homeTitle={homeTitle}
          heroTitle={heroTitle}
          setHeroTitle={setHeroTitle}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </LayoutGrid>
    ));
  }, [fieldNotes, homeTitle, heroTitle, setHeroTitle]);

  return (
    <HomeFieldNotesWrapper ref={wrapperRef}>
      <LayoutWrapper>{fieldNotesList}</LayoutWrapper>
    </HomeFieldNotesWrapper>
  );
};

export default HomeFieldNotes;
