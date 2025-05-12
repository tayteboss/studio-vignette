import styled from "styled-components";
import { FieldNoteType } from "../../../shared/types/types";

const FieldNoteCardWrapper = styled.div``;

type Props = {
  fieldNote: FieldNoteType;
};

const FieldNoteCard = (props: Props) => {
  const { fieldNote } = props;
  return <FieldNoteCardWrapper>FieldNoteCard</FieldNoteCardWrapper>;
};

export default FieldNoteCard;
