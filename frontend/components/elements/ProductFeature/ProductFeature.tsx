import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const ProductFeatureWrapper = styled.div`
  display: flex;
  gap: ${pxToRem(4)};
`;

const Title = styled.p`
  flex: 1;
  width: 50%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 40%;
  }
`;

const Value = styled.p`
  flex: 1;
  width: 50%;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    flex: 2;
    width: 60%;
  }
`;

type Props = {
  title?: string;
  value?: string;
};

const ProductFeature = (props: Props) => {
  const { title, value } = props;

  return (
    <ProductFeatureWrapper>
      <Title className="type-h4">{title || ""}</Title>
      <Value className="type-h4">{value || ""}</Value>
    </ProductFeatureWrapper>
  );
};

export default ProductFeature;
