import styled from "styled-components";
import {
  InformationPageType,
  SiteSettingsType,
} from "../../../shared/types/types";
import Link from "next/link";
import formatHTML from "../../../utils/formatHTML";
import pxToRem from "../../../utils/pxToRem";

const OfficeCardWrapper = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
`;

const Title = styled.h2`
  grid-column: span 2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    margin-bottom: ${pxToRem(16)};
  }
`;

const ContentWrapper = styled.div`
  grid-column: span 4;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const AddressWrapper = styled.div``;

const Address = styled.div`
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const LinkTag = styled.div`
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const SocialLinksWrapper = styled.div`
  a {
    display: inline-block;
    white-space: pre;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const SocialTitle = styled.div``;

type Props = {
  address: SiteSettingsType["address"];
  addressUrl: SiteSettingsType["addressUrl"];
  email: SiteSettingsType["email"];
  phone: SiteSettingsType["phone"];
  socialLinks: InformationPageType["socialLinks"];
};

const OfficeCard = (props: Props) => {
  const { address, addressUrl, email, phone, socialLinks } = props;

  return (
    <OfficeCardWrapper>
      <Title className="type-h5">03. Office</Title>
      <ContentWrapper className="type-h3">
        {addressUrl && (
          <Link href={addressUrl} target="_blank">
            <AddressWrapper>
              {address && (
                <Address
                  dangerouslySetInnerHTML={{ __html: formatHTML(address) }}
                />
              )}
            </AddressWrapper>
          </Link>
        )}
        {email && (
          <Link href={`mailto:${email}`}>
            <LinkTag>{email}</LinkTag>
          </Link>
        )}
        {phone && (
          <Link href={`tel:${phone}`}>
            <LinkTag>{phone}</LinkTag>
          </Link>
        )}
        {socialLinks && (
          <SocialLinksWrapper>
            {socialLinks.map(
              (socialLink, i) =>
                socialLink?.socialLink && (
                  <Link href={socialLink.socialLink} target="_blank" key={i}>
                    <SocialTitle>
                      {socialLink?.socialTitle || ""}
                      {i !== socialLinks.length - 1 ? ", " : ""}
                    </SocialTitle>
                  </Link>
                )
            )}
          </SocialLinksWrapper>
        )}
      </ContentWrapper>
    </OfficeCardWrapper>
  );
};

export default OfficeCard;
