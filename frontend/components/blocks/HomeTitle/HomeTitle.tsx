import styled from "styled-components";
import { FieldNoteType, HomePageType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { AnimatePresence, motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";

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

const Title = styled(motion.h1)`
  text-align: center;
`;

const DefaultTitle = styled(motion.h1)`
  text-align: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    max-width: ${pxToRem(270)};
  }
`;

const FieldNoteTitle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

type Props = {
  data: string | FieldNoteType;
};

const HomeTitle = (props: Props) => {
  const { data } = props;

  const isFieldNote = typeof data !== "string";

  const formatYear = (date: string) => {
    const year = new Date(date).getFullYear();
    return year;
  };

  return (
    <HomeTitleWrapper>
      <LayoutWrapper>
        <Inner>
          <AnimatePresence mode="wait">
            {isFieldNote ? (
              <FieldNoteTitle
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="field-note-title"
              >
                <Title className="type-h1">{data?.numeralIndex || ""}.</Title>
                <Title className="type-h1">{data?.title || ""}</Title>
                <Title className="type-h1">
                  {data?.season || ""}, {formatYear(data?.date) || ""}
                </Title>
              </FieldNoteTitle>
            ) : (
              <DefaultTitle
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="regular-title"
                className="type-h1"
              >
                {data}
              </DefaultTitle>
            )}
          </AnimatePresence>
        </Inner>
      </LayoutWrapper>
    </HomeTitleWrapper>
  );
};

export default HomeTitle;
