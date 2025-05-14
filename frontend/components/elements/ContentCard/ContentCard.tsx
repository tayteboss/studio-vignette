import styled from "styled-components";
import formatHTML from "../../../utils/formatHTML";
import pxToRem from "../../../utils/pxToRem";

const ContentCardWrapper = styled.div`
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

const Content = styled.div``;

type Props = {
  title: string;
  data: string;
};

const ContentCard = (props: Props) => {
  const { title, data } = props;

  return (
    <ContentCardWrapper>
      <Title className="type-h5">{title}</Title>
      <ContentWrapper className="type-h3">
        <Content dangerouslySetInnerHTML={{ __html: formatHTML(data) }} />
      </ContentWrapper>
    </ContentCardWrapper>
  );
};

export default ContentCard;
