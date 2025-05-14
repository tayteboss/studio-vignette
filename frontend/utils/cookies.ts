import Cookies from "js-cookie";

const VIEWED_FIELD_NOTES_COOKIE = "viewed_field_notes";
const COOKIE_EXPIRY_DAYS = 1;

export const getViewedFieldNotes = (): string[] => {
  const viewedNotes = Cookies.get(VIEWED_FIELD_NOTES_COOKIE);
  return viewedNotes ? JSON.parse(viewedNotes) : [];
};

export const addViewedFieldNote = (slug: string): void => {
  const viewedNotes = getViewedFieldNotes();
  if (!viewedNotes.includes(slug)) {
    viewedNotes.push(slug);
    Cookies.set(VIEWED_FIELD_NOTES_COOKIE, JSON.stringify(viewedNotes), {
      expires: COOKIE_EXPIRY_DAYS,
    });
  }
};
