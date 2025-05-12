import styled from "styled-components";
import { FieldNoteType } from "../../../shared/types/types";
import Link from "next/link";
import MediaStack from "../../common/MediaStack";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const FieldNoteCardWrapper = styled.div`
  width: 100%;
  margin-bottom: 20vh;
`;

const MediaWrapper = styled.div<{ $ratio: string | undefined }>`
  .media-wrapper {
    padding-top: ${(props) => props.$ratio || "100%"};
  }
`;

type Props = {
  fieldNote: FieldNoteType;
  setHeroTitle: (fieldNote: FieldNoteType | string) => void;
  homeTitle: string;
  heroTitle: string | FieldNoteType;
};

const FieldNoteCard = (props: Props) => {
  const { fieldNote, setHeroTitle, homeTitle, heroTitle } = props;

  const [mobileIsActive, setMobileIsActive] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.9,
    triggerOnce: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      if (inView) {
        setHeroTitle(fieldNote);
        setMobileIsActive(true);
      } else {
        setMobileIsActive(false);
      }
    }

    if (heroTitle !== fieldNote) {
      setMobileIsActive(false);
    }
  }, [inView, fieldNote, setHeroTitle, homeTitle, heroTitle]);

  return (
    <FieldNoteCardWrapper
      ref={ref}
      className={`${mobileIsActive ? "trigger-colour" : ""} field-note-card`}
      onMouseOver={() => setHeroTitle(fieldNote)}
      onMouseOut={() => setHeroTitle(homeTitle)}
    >
      <Link href={`/field-notes/${fieldNote?.slug.current}`}>
        <MediaWrapper $ratio={fieldNote?.heroMediaRatio}>
          <MediaStack data={fieldNote?.heroMedia} />
        </MediaWrapper>
      </Link>
    </FieldNoteCardWrapper>
  );
};

export default FieldNoteCard;
