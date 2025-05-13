import styled from "styled-components";
import client from "../../client";
import { motion } from "framer-motion";
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
import LayoutGrid from "../../components/layout/LayoutGrid";
import FieldNoteThumbnailCard from "../../components/blocks/FieldNoteThumbnailCard";
import { addNumeralsToFieldNotes } from "../../utils/fieldNotes";
import pxToRem from "../../utils/pxToRem";

const PageWrapper = styled(motion.div)`
  min-height: 100vh;
  background: var(--colour-cream);
  padding-top: ${pxToRem(100)};
`;

const FieldNotesList = styled.section`
  .layout-grid {
    grid-row-gap: ${pxToRem(20)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      grid-row-gap: ${pxToRem(10)};
    }
  }
`;

type Props = {
  data: FieldNotesPageType;
  fieldNotes: FieldNoteType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, fieldNotes, pageTransitionVariants } = props;

  console.log("fieldNotes", fieldNotes);

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
      <FieldNotesList>
        <LayoutWrapper>
          <LayoutGrid>
            {hasFieldNotes &&
              fieldNotes.map((fieldNote) => (
                <FieldNoteThumbnailCard
                  key={fieldNote.slug.current}
                  date={fieldNote.date}
                  heroMedia={fieldNote.heroMedia}
                  heroMediaRatio={fieldNote.heroMediaRatio}
                  title={fieldNote.title}
                  slug={fieldNote.slug}
                  numeralIndex={fieldNote.numeralIndex}
                  season={fieldNote.season}
                  categories={fieldNote.categories}
                />
              ))}
          </LayoutGrid>
        </LayoutWrapper>
      </FieldNotesList>
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
