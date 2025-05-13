import { FieldNoteType } from "../shared/types/types";

export const addNumeralsToFieldNotes = (
  fieldNotes: FieldNoteType[]
): FieldNoteType[] => {
  return fieldNotes.map((note: FieldNoteType, index: number) => ({
    ...note,
    numeralIndex: Array(index + 1)
      .fill("I")
      .join("")
      .replace(/IIIII/g, "V")
      .replace(/VV/g, "X")
      .replace(/XXXXX/g, "L")
      .replace(/LL/g, "C"),
  }));
};
