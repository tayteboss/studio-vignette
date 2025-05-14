import styled from "styled-components";
import client from "../../client";
import { AnimatePresence, motion } from "framer-motion";
import {
  FieldNoteType,
  FieldNotesPageType,
  TransitionsType,
} from "../../shared/types/types";
import { NextSeo } from "next-seo";
import {
  fieldNotesPageQueryString,
  fieldNotesQueryStringSimplified,
} from "../../lib/sanityQueries";
import LayoutWrapper from "../../components/layout/LayoutWrapper";
import { addNumeralsToFieldNotes } from "../../utils/fieldNotes";
import pxToRem from "../../utils/pxToRem";
import { useViewedFieldNotes } from "../../hooks/useViewedFieldNotes";
import FieldsNotesList from "../../components/blocks/FieldsNotesList";
import MediaStack from "../../components/common/MediaStack";
import { useState } from "react";

const PageWrapper = styled(motion.div)`
  min-height: 100vh;
  background: var(--colour-cream);
  padding-top: ${pxToRem(100)};
`;

const FieldNotesWrapper = styled.section``;

const MediaWrapper = styled(motion.section)<{
  $ratio: string;
  $isPortrait: boolean;
}>`
  position: fixed;
  bottom: ${pxToRem(20)};
  right: ${pxToRem(20)};
  z-index: 100;
  width: ${(props) => (props.$isPortrait ? "25vw" : "33vw")};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }

  .media-wrapper {
    padding-top: ${(props) => props.$ratio};
  }
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

type Props = {
  data: FieldNotesPageType;
  fieldNotes: FieldNoteType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, fieldNotes, pageTransitionVariants } = props;

  const [activeFieldNote, setActiveFieldNote] = useState<false | FieldNoteType>(
    false
  );

  const viewedFieldNotes = useViewedFieldNotes();

  const hasFieldNotes = fieldNotes && fieldNotes.length > 0;

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={data?.seoTitle || ""}
        description={data?.seoDescription || ""}
      />
      <FieldNotesWrapper>
        <LayoutWrapper>
          {hasFieldNotes && (
            <FieldsNotesList
              data={fieldNotes}
              viewedFieldNotes={viewedFieldNotes}
              useImageHover={true}
              setActiveFieldNote={setActiveFieldNote}
            />
          )}
        </LayoutWrapper>
      </FieldNotesWrapper>
      <AnimatePresence mode="wait">
        {activeFieldNote && (
          <MediaWrapper
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            $ratio={activeFieldNote.heroMediaRatio || "56.25%"}
            $isPortrait={parseInt(activeFieldNote.heroMediaRatio || "0") >= 100}
          >
            <MediaStack data={activeFieldNote.heroMedia} />
          </MediaWrapper>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(fieldNotesPageQueryString);
  let fieldNotes = await client.fetch(fieldNotesQueryStringSimplified);

  fieldNotes = addNumeralsToFieldNotes(fieldNotes);

  return {
    props: {
      data,
      fieldNotes,
    },
  };
}

export default Page;
