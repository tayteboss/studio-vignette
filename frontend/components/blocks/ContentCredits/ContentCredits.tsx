import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import CreditsItem from "../../elements/CreditsItem";

const ContentCreditsWrapper = styled.div`
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

type Props = {
  credits: SiteSettingsType["credits"];
};

const ContentCredits = (props: Props) => {
  const { credits } = props;

  const hasCredits = credits && credits.length > 0;

  return (
    <ContentCreditsWrapper>
      <Title className="type-small">04. Credits</Title>
      <ContentWrapper className="type-p">
        {hasCredits &&
          credits.map((credit) => (
            <CreditsItem
              key={credit.credit}
              credit={credit.credit}
              title={credit.title}
              link={credit.link}
            />
          ))}
      </ContentWrapper>
    </ContentCreditsWrapper>
  );
};

export default ContentCredits;
