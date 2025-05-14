import styled from "styled-components";
import client from "../../client";
import { FieldNoteType, TransitionsType } from "../../shared/types/types";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { mediaString, pageBuilderBlockString } from "../../lib/sanityQueries";
import { addNumeralsToFieldNotes } from "../../utils/fieldNotes";
import PageBuilder from "../../components/common/PageBuilder";
import FieldNoteHeader from "../../components/blocks/FieldNoteHeader";
import MoreNotes from "../../components/blocks/MoreNotes";
import { useViewedFieldNotes } from "../../hooks/useViewedFieldNotes";

const PageWrapper = styled(motion.div)``;

type Props = {
  data: FieldNoteType;
  fieldNotesWithNumerals: FieldNoteType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, fieldNotesWithNumerals, pageTransitionVariants } = props;
  const viewedFieldNotes = useViewedFieldNotes(data?.slug?.current);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={data?.title || ""}
        description={data?.heroMediaCaption || ""}
      />
      <FieldNoteHeader
        categories={data.categories}
        date={data.date}
        season={data.season}
        title={data.title}
        heroMedia={data.heroMedia}
        heroMediaRatio={data.heroMediaRatio}
        heroMediaCaption={data.heroMediaCaption}
        numeralIndex={data.numeralIndex}
      />
      <PageBuilder data={data.pageBuilder} />
      <MoreNotes
        data={fieldNotesWithNumerals}
        viewedFieldNotes={viewedFieldNotes}
      />
    </PageWrapper>
  );
};

export async function getStaticPaths() {
  const fieldNotesQuery = `
		*[_type == 'fieldNote'] [0...100] {
			slug
		}
	`;

  const allFieldNotes = await client.fetch(fieldNotesQuery);

  return {
    paths: allFieldNotes.map((item: any) => {
      return `/field-notes/${item?.slug?.current}`;
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const fieldNoteQuery = `
		*[_type == 'fieldNote' && slug.current == "${params.slug[0]}"][0] {
			title,
      slug,
      date,
      season,
      categories[]-> {
        name
      },
      heroMedia {
        ${mediaString}
      },
      heroMediaRatio,
      heroMediaCaption,
      pageBuilder[] {
        ${pageBuilderBlockString}
      }
		}
	`;

  const allFieldNotesQuery = `
    *[_type == 'fieldNote'] | order(date desc) [0...100] {
      title,
      slug,
      categories[]-> {
        name
      },
      date,
      season
    }
  `;

  const data = await client.fetch(fieldNoteQuery);
  const allFieldNotes = await client.fetch(allFieldNotesQuery);

  // Add numerals to all field notes
  const fieldNotesWithNumerals = addNumeralsToFieldNotes(allFieldNotes);

  // Find our current field note with its numeral
  const currentFieldNote = fieldNotesWithNumerals.find(
    (note) => note.slug.current === params.slug[0]
  );

  return {
    props: {
      data: {
        ...data,
        numeralIndex: currentFieldNote?.numeralIndex || "",
      },
      fieldNotesWithNumerals,
    },
  };
}

export default Page;
