import styled from "styled-components";

const TextSwitchWrapper = styled.div`
  &:hover {
    .resting {
      display: none;
    }
    .hover {
      display: block;
    }
  }
`;

const Resting = styled.div`
  display: block;
`;

const Hover = styled.div`
  display: none;
`;

type Props = {
  resting: string;
  hover: string;
};

const TextSwitch = (props: Props) => {
  const { resting, hover } = props;

  return (
    <TextSwitchWrapper>
      <Resting className="type-h4 resting">{resting}</Resting>
      <Hover className="type-h4 hover">{hover}</Hover>
    </TextSwitchWrapper>
  );
};

export default TextSwitch;
