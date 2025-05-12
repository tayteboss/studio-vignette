import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  FieldNoteType,
  HomePageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  fieldNotesQueryString,
  fieldNotesQueryStringSimplified,
  homePageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import { useEffect, useState } from "react";
import HomeTitle from "../components/blocks/HomeTitle";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import HomeFieldNotes from "../components/blocks/HomeFieldNotes";

const PageWrapper = styled(motion.div)``;

type Props = {
  data: HomePageType;
  siteSettings: SiteSettingsType;
  fieldNotes: FieldNoteType[];
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, siteSettings, fieldNotes, pageTransitionVariants } = props;

  const [heroTitle, setHeroTitle] = useState<string | FieldNoteType>(
    data?.title
  );

  console.log("data", data);
  console.log("siteSettings", siteSettings);
  console.log("fieldNotes", fieldNotes);

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
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const data = await client.fetch(homePageQueryString);
  let fieldNotes = await client.fetch(fieldNotesQueryStringSimplified);

  const fieldNotesWithNumerals = fieldNotes.map(
    (note: FieldNoteType, index: number) => ({
      ...note,
      numeralIndex: Array(index + 1)
        .fill("I")
        .join("")
        .replace(/IIIII/g, "V")
        .replace(/VV/g, "X")
        .replace(/XXXXX/g, "L")
        .replace(/LL/g, "C"),
    })
  );

  fieldNotes = fieldNotesWithNumerals;

  return {
    props: {
      data,
      siteSettings,
      fieldNotes,
    },
  };
}

export default Page;
