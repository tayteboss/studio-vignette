import styled from "styled-components";
import { HeadingBlock as HeadingBlockType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";

const HeadingBlockWrapper = styled.section`
  position: relative;
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }
`;

const Inner = styled.div`
  position: relative;
`;

const Subheading = styled.h2`
  position: absolute;
  top: 8px;
  left: 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    position: relative;
    top: unset;
    left: unset;
    margin-bottom: ${pxToRem(15)};
  }
`;

const Heading = styled.p`
  text-indent: calc((100% / 12) * 4);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    text-indent: calc((100% / 8) * 2);
  }
`;

type Props = HeadingBlockType;

const HeadingBlock = (props: Props) => {
  const { headingBlockPB } = props;

  const { subheading, heading } = headingBlockPB;

  return (
    <HeadingBlockWrapper>
      <LayoutWrapper>
        <Inner>
          <Subheading className="type-small">{subheading || ""}</Subheading>
          <Heading className="type-h2">{heading || ""}</Heading>
        </Inner>
      </LayoutWrapper>
    </HeadingBlockWrapper>
  );
};

export default HeadingBlock;
