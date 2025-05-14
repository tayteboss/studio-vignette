import { useState, useEffect } from "react";
import { addViewedFieldNote, getViewedFieldNotes } from "../utils/cookies";

export const useViewedFieldNotes = (currentSlug?: string) => {
  const [viewedFieldNotes, setViewedFieldNotes] = useState<string[]>([]);

  useEffect(() => {
    // Get initial viewed notes
    const initialViewedNotes = getViewedFieldNotes();
    setViewedFieldNotes(initialViewedNotes);

    // Add current note to viewed notes if it exists
    if (currentSlug) {
      addViewedFieldNote(currentSlug);
      setViewedFieldNotes((prev) => {
        if (!prev.includes(currentSlug)) {
          return [...prev, currentSlug];
        }
        return prev;
      });
    }
  }, [currentSlug]);

  return viewedFieldNotes;
};
