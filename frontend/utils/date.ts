export const formatYear = (date: string): string => {
  if (!date) return "";
  return new (Date as any)(date).getFullYear().toString();
};

export const formatDate = (date: string): string => {
  if (!date) return "";
  const d = new (Date as any)(date);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
};
