import myAxios from "./instanceAxios";

// ##### *** GET *** ##### \\

export function getWorkshops() {
  return myAxios
    .get("/workshops")
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}

export function getWorkshopByLevel(level) {
  return myAxios
    .get(`/workshops?level=${level}`)
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}

export function getWorkshop(id) {
  return myAxios
    .get(`/workshops/${id}`)
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}

export function getStudents() {
  return myAxios
    .get("/students")
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}

export function getStudent(id) {
  return myAxios
    .get(`/students/${id}`)
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}

export function getLocation() {
  return myAxios
    .get("/locations")
    .then((response) => response.data.result)
    .catch((error) => console.info(error));
}

// ##### *** ADD *** ##### \\

export function addWorkshop(workshop) {
  return myAxios
    .post("/workshops", workshop)
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

// ##### *** EDIT *** ##### \\

export function editWorkshop(workshop) {
  return myAxios
    .put(`/workshops/${workshop.id}`, workshop)
    .then((response) => response.data)
    .catch((error) => console.info(error));
}
