import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const NameCardWrapper = styled.div`
  display: flex;
  gap: ${pxToRem(20)};
`;

const P = styled.p``;

const NameWrapper = styled.div``;

const Name = styled.p``;

const Role = styled.p``;

type NameCardProps = {
  name: string;
  role: string;
  position: string;
};

const NameCard = ({ name, role, position }: NameCardProps) => {
  return (
    <NameCardWrapper>
      <P className="type-h6">{position}</P>
      <NameWrapper>
        <Name className="type-h6">{name}</Name>
        <Role className="type-h6">{role}</Role>
      </NameWrapper>
    </NameCardWrapper>
  );
};

export default NameCard;
