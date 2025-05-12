import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";

const HomeTitleWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  pointer-events: none;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

type Props = {
  title: HomePageType["title"];
};

const HomeTitle = (props: Props) => {
  const { title } = props;

  return (
    <HomeTitleWrapper>
      <LayoutWrapper>
        <Inner>
          <Title>{title || ""}</Title>
        </Inner>
      </LayoutWrapper>
    </HomeTitleWrapper>
  );
};

export default HomeTitle;
