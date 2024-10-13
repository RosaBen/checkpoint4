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
  if (!workshop || !workshop.id) {
    console.error("Invalid workshop data: ", workshop);
    return Promise.reject(new Error("Invalid workshop data"));
  }
  return myAxios
    .put(`/workshops/${workshop.id}`, workshop, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => console.info(error));
}

// ##### *** DELETE *** ##### \\

export function deleteWorkshop(id) {
  return myAxios
    .delete(`/workshops/${id}`)
    .then((response) => response.data)
    .catch((error) => console.info(error));
}
