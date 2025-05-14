import styled from "styled-components";
import { FieldNoteType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import LayoutWrapper from "../../layout/LayoutWrapper";
import FieldsNotesList from "../FieldsNotesList/FieldsNotesList";

const MoreNotesWrapper = styled.div`
  margin-bottom: ${pxToRem(100)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(50)};
  }
`;

const Title = styled.h2`
  text-align: center;
  padding: ${pxToRem(100)} 0;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    padding: ${pxToRem(50)} 0;
  }
`;

type Props = {
  data: FieldNoteType[];
  viewedFieldNotes: string[];
};

const MoreNotes = (props: Props) => {
  const { data, viewedFieldNotes } = props;

  return (
    <MoreNotesWrapper>
      <LayoutWrapper>
        <Title className="type-h5 uppercase">More Field Notes</Title>
        <FieldsNotesList data={data} viewedFieldNotes={viewedFieldNotes} />
      </LayoutWrapper>
    </MoreNotesWrapper>
  );
};

export default MoreNotes;
