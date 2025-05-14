import styled from "styled-components";
import { ConsiderationsBlock as ConsiderationsBlockType } from "../../../shared/types/types";
import LayoutGrid from "../../layout/LayoutGrid";
import LayoutWrapper from "../../layout/LayoutWrapper";
import pxToRem from "../../../utils/pxToRem";
import ConsiderationCard from "../../elements/ConsiderationCard";

const ConsiderationsBlockWrapper = styled.section`
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }

  .layout-grid {
    grid-row-gap: ${pxToRem(100)};

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      grid-row-gap: ${pxToRem(50)};
    }
  }
`;

const Title = styled.h2`
  margin-bottom: ${pxToRem(20)};
`;

const CardsWrapper = styled.div`
  .considerations-card {
    &:nth-child(7n + 1) {
      grid-column: span 2;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        grid-column: 2 / -2;
      }
    }

    &:nth-child(7n + 2) {
      grid-column: span 6;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        grid-column: 1 / -1;
      }
    }

    &:nth-child(7n + 3) {
      grid-column: span 4;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        grid-column: 4 / -1;
      }
    }

    &:nth-child(7n + 4) {
      grid-column: span 4;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        grid-column: 1 / -2;
      }
    }

    &:nth-child(7n + 5) {
      grid-column: span 3;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        grid-column: 1 / -1;
      }
    }

    &:nth-child(7n + 6) {
      grid-column: span 3;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        grid-column: 3 / -1;
      }
    }

    &:nth-child(7n + 7) {
      grid-column: span 2;

      @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
        grid-column: 1 / -1;
      }
    }
  }
`;

type Props = ConsiderationsBlockType;

const ConsiderationsBlock = (props: Props) => {
  const { considerationsBlockPB } = props;

  const { subheading, considerations } = considerationsBlockPB;

  const hasData = considerations && considerations.length > 0;

  return (
    <ConsiderationsBlockWrapper>
      <LayoutWrapper>
        <Title className="type-small">{subheading || ""}</Title>
        {hasData && (
          <CardsWrapper>
            <LayoutGrid>
              {considerations.map((consideration, i) => (
                <ConsiderationCard key={i} {...consideration} index={i} />
              ))}
            </LayoutGrid>
          </CardsWrapper>
        )}
      </LayoutWrapper>
    </ConsiderationsBlockWrapper>
  );
};

export default ConsiderationsBlock;
