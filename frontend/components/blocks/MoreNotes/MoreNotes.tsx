import styled from "styled-components";
import { FieldNoteType } from "../../../shared/types/types";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";
import LayoutGrid from "../../layout/LayoutGrid";
import LayoutWrapper from "../../layout/LayoutWrapper";
import { formatDate, formatYear } from "../../../utils/date";

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

const NotesHeader = styled.div`
  padding-bottom: ${pxToRem(10)};
  background-image: linear-gradient(
    to right,
    rgba(114, 77, 51, 0.2) 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 12px 1px;
  background-repeat: repeat-x;
`;

const HeaderNumber = styled.p`
  grid-column: span 1;
`;

const HeaderTitle = styled.p`
  grid-column: span 5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: span 6;
  }
`;

const HeaderCategories = styled.p`
  grid-column: span 5;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const HeaderDate = styled.p`
  grid-column: span 1;
  text-align: right;
`;

const NotesWrapper = styled.div``;

const NotesList = styled.div``;

const NoteInner = styled.div`
  padding: ${pxToRem(10)} 0;
  position: relative;
  background-image: linear-gradient(
    to right,
    rgba(114, 77, 51, 0.2) 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 12px 1px;
  background-repeat: repeat-x;

  a {
    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      opacity: 0.5;
    }
  }
`;

const NoteNumber = styled.p<{ $isViewed: boolean }>`
  grid-column: span 1;
  font-family: var(--font-marfa);
  font-weight: 400;
  font-size: ${pxToRem(10)};
  line-height: normal;
  ${(props) => props.$isViewed && `text-decoration: line-through;`}
`;

const NoteTitle = styled.p<{ $isViewed: boolean }>`
  grid-column: span 5;
  font-family: var(--font-marfa);
  font-weight: 400;
  font-size: ${pxToRem(10)};
  line-height: normal;
  ${(props) => props.$isViewed && `text-decoration: line-through;`}

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: span 5;
  }
`;

const NoteCategories = styled.p<{ $isViewed: boolean }>`
  grid-column: span 5;
  font-family: var(--font-marfa);
  font-weight: 400;
  font-size: ${pxToRem(10)};
  line-height: normal;
  ${(props) => props.$isViewed && `text-decoration: line-through;`}

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

const NoteDate = styled.p<{ $isViewed: boolean }>`
  grid-column: span 1;
  font-family: var(--font-marfa);
  font-weight: 400;
  font-size: ${pxToRem(10)};
  line-height: normal;
  text-align: right;
  ${(props) => props.$isViewed && `text-decoration: line-through;`}

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: span 2;
  }
`;

type Props = {
  data: FieldNoteType[];
  viewedFieldNotes: string[];
};

const MoreNotes = (props: Props) => {
  const { data, viewedFieldNotes } = props;

  console.log("data", data);
  console.log("viewedFieldNotes", viewedFieldNotes);

  return (
    <MoreNotesWrapper>
      <LayoutWrapper>
        <Title className="type-h5 uppercase">More Field Notes</Title>
        <NotesWrapper>
          <NotesHeader>
            <LayoutGrid>
              <HeaderNumber className="type-p">No.</HeaderNumber>
              <HeaderTitle className="type-p">Title</HeaderTitle>
              <HeaderCategories className="type-p">Categories</HeaderCategories>
              <HeaderDate className="type-p">Date</HeaderDate>
            </LayoutGrid>
          </NotesHeader>
          <NotesList>
            {data.map((note) => (
              <NoteInner>
                <Link href={`/field-notes/${note.slug.current}`}>
                  <LayoutGrid>
                    <NoteNumber
                      $isViewed={viewedFieldNotes.includes(note.slug.current)}
                    >
                      {note.numeralIndex}.
                    </NoteNumber>
                    <NoteTitle
                      $isViewed={viewedFieldNotes.includes(note.slug.current)}
                    >
                      {note.title}, {note.season || ""}{" "}
                      {formatYear(note.date) || ""}
                    </NoteTitle>
                    <NoteCategories
                      $isViewed={viewedFieldNotes.includes(note.slug.current)}
                    >
                      {note.categories
                        ?.map((category) => category.name)
                        .join(", ")}
                    </NoteCategories>
                    <NoteDate
                      $isViewed={viewedFieldNotes.includes(note.slug.current)}
                    >
                      {formatDate(note.date)}
                    </NoteDate>
                  </LayoutGrid>
                </Link>
              </NoteInner>
            ))}
          </NotesList>
        </NotesWrapper>
      </LayoutWrapper>
    </MoreNotesWrapper>
  );
};

export default MoreNotes;
