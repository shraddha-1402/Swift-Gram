export const formatDate = (date) =>
  new Date(date).toDateString().split(" ").slice(1, 4).join(" ");
