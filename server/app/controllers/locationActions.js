// Import access to database tables
const tables = require("../../database/tables");

// ***BROWSE***\\

const browse = async (req, res, next) => {
  try {
    const locations = await tables.location.readAll();
    if (locations.length === 0) {
      res.json({
        message: "pas de cours sur cet endroit",
        result: locations,
      });
    } else {
      res.json({ result: locations });
    }
  } catch (err) {
    next(err);
  }
};

const browseByCity = async (req, res, next) => {
  try {
    const locations = await tables.location.readAllByCity(req.params.city);
    if (locations.length === 0) {
      res.json({
        message: "pas de cours pour cet endroit",
        result: locations,
      });
    } else {
      res.json({ result: locations });
    }
  } catch (err) {
    next(err);
  }
};

// ***READ***\\

const read = async (req, res, next) => {
  try {
    const location = await tables.location.read(req.params.id);

    if (location) {
      res.json({ result: location });
    } else {
      res.status(404).json({ message: "endroit pas trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

// ***EDIT***\\

const edit = async (req, res, next) => {
  const location = { ...req.body, id: req.params.id };
  console.info("actions", location);
  try {
    await tables.location.update(location);
    res.status(204).send(`lieu modifié avec succès: { id:${req.params.id} }`);
  } catch (err) {
    next(err);
  }
};

// ***ADD***\\
const add = async (req, res, next) => {
  const location = req.body;

  try {
    const result = await tables.location.create(location);
    res.status(201).send(`lieu ajouté avec succès: #{ id:${result} }`);
  } catch (err) {
    next(err);
  }
};

// ***DESTROY***\\

const destroy = async (req, res, next) => {
  try {
    await tables.location.delete(req.params.id);
    res.status(204).send("lieu supprimé avec succès");
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  browseByCity,
  read,
  edit,
  add,
  destroy,
};
