import myAxios from "./instanceAxios";

// ##### *** GET *** ##### \\

export function getWorkshops(level, workshopDate) {
  const params = new URLSearchParams();
  if (level) {
    params.append("level", level);
  }
  if (workshopDate) {
    params.append("workshopDate", workshopDate);
  }
  return myAxios
    .get(`/workshops?${params.toString()}`)
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}

export function getWorkshop(id) {
  return myAxios
    .get(`/workshops/${id}`)
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

export function getStudents() {
  return myAxios
    .get("/students")
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

export function getStudent(id) {
  return myAxios
    .get(`/students/${id}`)
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

export function getLocation() {
  return myAxios
    .get("/locations")
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}
