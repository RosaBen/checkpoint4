function formatDate(date) {
  const [, day, month, year] = new Date(date).toDateString().split(" ");

  const monthNames = {
    janvier: "01",
    février: "02",
    mars: "03",
    avril: "04",
    mai: "05",
    juin: "06",
    juillet: "07",
    août: "08",
    septembre: "09",
    octobre: "10",
    novembre: "11",
    décembre: "12",
  };

  const monthNumber = monthNames[month.toLocaleLowerCase()];
  const dayNumber = day.padStart(2, "0");

  return `${year}-${monthNumber}-${dayNumber}`;
}

function formatTime(time) {
  const [hour, minute] = time.split("h");
  return `${hour}:${minute}:00`;
}

export default { formatDate, formatTime };
