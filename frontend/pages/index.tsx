import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  FieldNoteType,
  HomePageType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  fieldNotesQueryStringSimplified,
  homePageQueryString,
} from "../lib/sanityQueries";
import { useEffect, useState } from "react";
import HomeTitle from "../components/blocks/HomeTitle";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import HomeFieldNotes from "../components/blocks/HomeFieldNotes";
import { addNumeralsToFieldNotes } from "../utils/fieldNotes";

const PageWrapper = styled(motion.div)``;

type Props = {
  data: HomePageType;
  fieldNotes: FieldNoteType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, fieldNotes, pageTransitionVariants } = props;

  const [heroTitle, setHeroTitle] = useState<string | FieldNoteType>(
    data?.title
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLenis();

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
      <HomeTitle data={heroTitle} />
      <ReactLenis root>
        <HomeFieldNotes
          fieldNotes={fieldNotes}
          homeTitle={data?.title}
          setHeroTitle={setHeroTitle}
          heroTitle={heroTitle}
        />
      </ReactLenis>
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(homePageQueryString);
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
