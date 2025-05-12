import styled from "styled-components";
import { FieldNoteType } from "../../../shared/types/types";
import LayoutWrapper from "../../layout/LayoutWrapper";
import LayoutGrid from "../../layout/LayoutGrid";
import FieldNoteCard from "../FieldNoteCard";

const HomeFieldNotesWrapper = styled.section``;

type Props = {
  fieldNotes: FieldNoteType[];
};

const HomeFieldNotes = (props: Props) => {
  const { fieldNotes } = props;

  const hasFieldNotes = fieldNotes && fieldNotes.length > 0;

  return (
    <HomeFieldNotesWrapper>
      <LayoutWrapper>
        <LayoutGrid>
          {hasFieldNotes &&
            fieldNotes.map((fieldNote) => (
              <FieldNoteCard key={fieldNote.title} fieldNote={fieldNote} />
            ))}
        </LayoutGrid>
      </LayoutWrapper>
    </HomeFieldNotesWrapper>
  );
};

export default HomeFieldNotes;
