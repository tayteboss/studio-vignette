import Link from "next/link";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import useActiveLink from "../../../hooks/useActiveLink";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: ${pxToRem(20)};
  padding: ${pxToRem(20)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(10)};
  }
`;

const LinkTag = styled.div<{ $isActive: boolean }>`
  text-decoration: ${(props) => (props.$isActive ? "underline" : "none")};
  text-transform: ${(props) => (props.$isActive ? "uppercase" : "none")};

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 0.5;
  }
`;

const Header = () => {
  const activeLink = useActiveLink();

  return (
    <HeaderWrapper className="header">
      <Link href="/">
        <LinkTag className="type-small" $isActive={activeLink === "home"}>
          Studio Vignette
        </LinkTag>
      </Link>
      <Link href="/field-notes">
        <LinkTag
          className="type-small"
          $isActive={activeLink === "field-notes"}
        >
          Field Notes
        </LinkTag>
      </Link>
      <Link href="/information">
        <LinkTag
          className="type-small"
          $isActive={activeLink === "information"}
        >
          Information
        </LinkTag>
      </Link>
    </HeaderWrapper>
  );
};

export default Header;
