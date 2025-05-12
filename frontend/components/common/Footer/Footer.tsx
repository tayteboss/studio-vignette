import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import Link from "next/link";
import formatHTML from "../../../utils/formatHTML";
import pxToRem from "../../../utils/pxToRem";
import TextSwitch from "../../elements/TextSwitch/TextSwitch";

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 1000;
  padding: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(10)};
  }
`;

const Address = styled.div`
  &:hover {
    opacity: 0.5;
  }

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Links = styled.div`
  display: flex;

  span {
    white-space: pre;
  }
`;

type Props = {
  address: SiteSettingsType["address"];
  addressUrl: SiteSettingsType["addressUrl"];
  email: SiteSettingsType["email"];
  phone: SiteSettingsType["phone"];
  instagramUrl: SiteSettingsType["instagramUrl"];
  instagramUsername: SiteSettingsType["instagramUsername"];
};

const Footer = (props: Props) => {
  const { address, addressUrl, email, phone, instagramUrl, instagramUsername } =
    props;

  return (
    <FooterWrapper className="footer">
      <Link href={addressUrl} target="_blank">
        <Address
          className="type-small"
          dangerouslySetInnerHTML={{ __html: formatHTML(address) }}
        />
      </Link>
      <Links className="type-small">
        {email && (
          <Link href={`mailto:${email}`}>
            <TextSwitch resting="Email" hover={email} />
          </Link>
        )}
        <span>, </span>
        {instagramUrl && (
          <Link href={instagramUrl} target="_blank">
            <TextSwitch resting="Instagram" hover={instagramUsername} />
          </Link>
        )}
        <span>, </span>
        {phone && (
          <Link href={`tel:${phone}`}>
            <TextSwitch resting="Phone" hover={phone} />
          </Link>
        )}
      </Links>
    </FooterWrapper>
  );
};

export default Footer;
