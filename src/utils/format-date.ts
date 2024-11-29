import { format } from "date-fns";

export const formatDate = (date: string | Date, formatString?: string) => {
  return format(date, formatString || "dd/MMM/yyyy");
};
