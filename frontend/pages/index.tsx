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
  homePageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import { useState } from "react";
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

  const [heroTitle, setHeroTitle] = useState(data?.title);

  console.log("data", data);
  console.log("siteSettings", siteSettings);
  console.log("fieldNotes", fieldNotes);

  const lenis = useLenis(({ scroll }) => {});

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
      <HomeTitle title={heroTitle} />
      <ReactLenis root>
        <HomeFieldNotes fieldNotes={fieldNotes} />
      </ReactLenis>
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const data = await client.fetch(homePageQueryString);
  const fieldNotes = await client.fetch(fieldNotesQueryString);

  return {
    props: {
      data,
      siteSettings,
      fieldNotes,
    },
  };
}

export default Page;
