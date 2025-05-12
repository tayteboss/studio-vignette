import Link from "next/link";
import styled from "styled-components";

const CreditsItemWrapper = styled.div`
  a {
    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const Tag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 4px;
  width: 100%;
  position: relative;
`;

const Credit = styled.span`
  white-space: nowrap;
  background: var(--colour-cream);
  position: relative;
  z-index: 2;
  padding-right: 3px;
`;

const Dots = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
`;

const Title = styled.span`
  white-space: nowrap;
  background: var(--colour-cream);
  position: relative;
  z-index: 2;
  padding-left: 3px;
`;

type Props = {
  credit: string;
  title: string;
  link: string;
};

const CreditsItem = (props: Props) => {
  const { credit, title, link } = props;

  // Calculate number of dots based on container width
  const getDots = () => {
    return ". ".repeat(100).trim(); // Adjust number as needed
  };

  return (
    <CreditsItemWrapper>
      {link ? (
        <Link href={link} target="_blank">
          <Tag className="type-h6">
            <Credit>{credit || ""}</Credit>
            <Title>{title || ""}</Title>
            <Dots>{getDots()}</Dots>
          </Tag>
        </Link>
      ) : (
        <Tag className="type-h6">
          <Credit>{credit || ""}</Credit>
          <Title>{title || ""}</Title>
          <Dots>{getDots()}</Dots>
        </Tag>
      )}
    </CreditsItemWrapper>
  );
};

export default CreditsItem;
