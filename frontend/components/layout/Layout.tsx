import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { SiteSettingsType } from "../../shared/types/types";

const siteSettings: SiteSettingsType = require("../../json/siteSettings.json");

const Main = styled.main``;

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  const lenis = useLenis(({ scroll }) => {});

  return (
    <>
      <Header />
      <ReactLenis root>
        <Main>{children}</Main>
      </ReactLenis>
      <Footer
        address={siteSettings?.address}
        addressUrl={siteSettings?.addressUrl}
        email={siteSettings?.email}
        phone={siteSettings?.phone}
        instagramUrl={siteSettings?.instagramUrl}
        instagramUsername={siteSettings?.instagramUsername}
      />
    </>
  );
};

export default Layout;
