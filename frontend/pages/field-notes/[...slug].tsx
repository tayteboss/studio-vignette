import styled from "styled-components";
import client from "../../client";
import { FieldNoteType, TransitionsType } from "../../shared/types/types";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { mediaString, pageBuilderBlockString } from "../../lib/sanityQueries";

type Props = {
  data: FieldNoteType;
  pageTransitionVariants: TransitionsType;
};

const PageWrapper = styled(motion.div)``;

const Page = (props: Props) => {
  const { data, pageTransitionVariants } = props;

  console.log("data", data);

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
      {/* <PageBuilder data={f} /> */}
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
			...,
			title,
			slug,
			date,
			heroMedia {
				${mediaString}
			},
			heroMediaCaption,
			pageBuilder[] {
				${pageBuilderBlockString}
			}
		}
	`;
  const data = await client.fetch(fieldNoteQuery);

  return {
    props: {
      data,
    },
  };
}

export default Page;
