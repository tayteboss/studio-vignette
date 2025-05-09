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
  fieldNotesQueryString,
} from "../../lib/sanityQueries";
import PageBuilder from "../../components/common/PageBuilder";

const PageWrapper = styled(motion.div)`
  min-height: 150vh;
  background: var(--colour-white);
`;

type Props = {
  data: FieldNotesPageType;
  fieldNotes: FieldNoteType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, fieldNotes, pageTransitionVariants } = props;

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
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(fieldNotesPageQueryString);
  const fieldNotes = await client.fetch(fieldNotesQueryString);

  return {
    props: {
      data,
      fieldNotes,
    },
  };
}

export default Page;
