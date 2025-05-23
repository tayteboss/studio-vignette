import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  InformationPageType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  informationPageQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import LayoutGrid from "../components/layout/LayoutGrid";
import MediaStack from "../components/common/MediaStack";
import NameCard from "../components/elements/NameCard";
import pxToRem from "../utils/pxToRem";
import ContentCard from "../components/elements/ContentCard";
import OfficeCard from "../components/elements/OfficeCard";
import ContentCredits from "../components/blocks/ContentCredits";

const PageWrapper = styled(motion.div)``;

const ImageWrapper = styled.div`
  grid-column: 1 / 5;
  width: 100%;
  align-self: end;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: ${pxToRem(64)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 5 / -1;
    padding-top: ${pxToRem(50)};
    margin-bottom: ${pxToRem(50)};
    min-height: unset;
    flex-direction: column-reverse;
  }
`;

const MediaWrapper = styled.div`
  margin-bottom: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(10)};
  }

  .media-wrapper {
    padding-top: 150%;
  }
`;

const NamesWrapper = styled.div`
  margin-bottom: ${pxToRem(16)};
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(12)};
`;

const ContentWrapper = styled.div`
  grid-column: 7 / -1;
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: 1fr auto;
  padding-top: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    padding-top: 0;
  }
`;

const ContentTop = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-content: start;
  grid-row-gap: ${pxToRem(20)};
  margin-bottom: ${pxToRem(40)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-row-gap: ${pxToRem(50)};
  }

  > * {
    grid-column: 1 / -1;
  }
`;

const ContentBottom = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  padding-bottom: ${pxToRem(20)};
`;

type Props = {
  data: InformationPageType;
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, siteSettings, pageTransitionVariants } = props;

  const hasMediaIdentifiers = data?.mediaIdentifiers.length > 0;

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
      <LayoutWrapper>
        <LayoutGrid>
          <ImageWrapper>
            <NamesWrapper>
              {hasMediaIdentifiers &&
                data?.mediaIdentifiers.map((identifier, i) => (
                  <NameCard
                    key={i}
                    name={identifier.name}
                    role={identifier.role}
                    position={identifier.position}
                  />
                ))}
            </NamesWrapper>
            <MediaWrapper>
              <MediaStack data={data?.media} />
            </MediaWrapper>
          </ImageWrapper>
          <ContentWrapper>
            <ContentTop>
              <ContentCard title="01. Profile" data={data?.profileText} />
              <ContentCard title="02. Careers" data={data?.careersText} />
              <OfficeCard
                address={siteSettings?.address}
                addressUrl={siteSettings?.addressUrl}
                email={siteSettings?.email}
                phone={siteSettings?.phone}
                socialLinks={data?.socialLinks}
              />
            </ContentTop>
            <ContentBottom>
              <ContentCredits credits={siteSettings?.credits} />
            </ContentBottom>
          </ContentWrapper>
        </LayoutGrid>
      </LayoutWrapper>
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const data = await client.fetch(informationPageQueryString);

  return {
    props: {
      data,
      siteSettings,
    },
  };
}

export default Page;
