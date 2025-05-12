import styled from "styled-components";
import formatHTML from "../../../utils/formatHTML";

const ContentCardWrapper = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
`;

const Title = styled.h2`
  grid-column: span 2;
`;

const ContentWrapper = styled.div`
  grid-column: span 4;
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
      <Title className="type-small">{title}</Title>
      <ContentWrapper className="type-p">
        <Content dangerouslySetInnerHTML={{ __html: formatHTML(data) }} />
      </ContentWrapper>
    </ContentCardWrapper>
  );
};

export default ContentCard;
