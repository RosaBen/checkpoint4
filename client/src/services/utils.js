const formatDate = (dateString) => {
  if (!dateString) {
    return "date non valide";
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "date non valide";
  }
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
};

export default formatDate;
