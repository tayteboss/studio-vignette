import { FieldNoteType } from "../shared/types/types";

export const addNumeralsToFieldNotes = (
  fieldNotes: FieldNoteType[]
): FieldNoteType[] => {
  const reversedNotes = [...fieldNotes].reverse();
  return reversedNotes.map((note: FieldNoteType, index: number) => ({
    ...note,
    numeralIndex: Array(index + 1)
      .fill("I")
      .join("")
      .replace(/IIIII/g, "V")
      .replace(/IIII/g, "IV")
      .replace(/VV/g, "X")
      .replace(/VIIII/g, "IX")
      .replace(/XXXXX/g, "L")
      .replace(/LL/g, "C"),
  }));
};
