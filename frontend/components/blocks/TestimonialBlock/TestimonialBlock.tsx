import styled from "styled-components";
import { TestimonialBlock as TestimonialBlockType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";

const TestimonialBlockWrapper = styled.section`
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }
`;

const Inner = styled.div`
  padding: ${pxToRem(50)};
  grid-column: 2 / -2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${pxToRem(50)};
  border: 1px solid var(--colour-primary);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(25)};
    grid-column: 1 / -1;
    gap: ${pxToRem(40)};
  }
`;

const Quote = styled.blockquote`
  font-family: var(--font-hal);
  font-weight: 400;
  font-size: ${pxToRem(28)};
  line-height: normal;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    font-size: ${pxToRem(14)};
    line-height: 1.3;
  }
`;

const AuthorWrapper = styled.div`
  span {
    white-space: pre;
  }
`;

type Props = TestimonialBlockType;

const TestimonialBlock = (props: Props) => {
  const { testimonialBlockPB } = props;

  const { quote, figureNumber, authorAndDate } = testimonialBlockPB;

  return (
    <TestimonialBlockWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          <Inner>
            {quote && <Quote>{quote}</Quote>}
            <AuthorWrapper className="type-h6">
              <span>{figureNumber}. </span>
              <span> </span>
              <span>{authorAndDate}</span>
            </AuthorWrapper>
          </Inner>
        </LayoutGrid>
      </LayoutWrapper>
    </TestimonialBlockWrapper>
  );
};

export default TestimonialBlock;
