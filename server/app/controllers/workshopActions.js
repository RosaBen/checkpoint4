// Import access to database tables
const tables = require("../../database/tables");

// ***BROWSE***\\
const browse = async (req, res, next) => {
  try {
    const { level, workshopDate } = req.query;
    const workshops = await tables.workshop.readAll(level, workshopDate);
    if (workshops.length === 0) {
      res.json({
        message: "pas de cours ",
        result: workshops,
      });
    } else {
      res.json({ result: workshops });
    }
  } catch (err) {
    next(err);
  }
};

const browseByLevel = async (req, res, next) => {
  try {
    const workshops = await tables.workshop.readAllByLevel(req.params.level);
    if (workshops.length === 0) {
      res.json({
        message: "pas de cours pour ce niveau",
        result: workshops,
      });
    } else {
      res.json({ result: workshops });
    }
  } catch (err) {
    next(err);
  }
};

const browseByDate = async (req, res, next) => {
  try {
    const workshops = await tables.workshop.readAllByDate(
      req.params.workshopDate
    );
    if (workshops.length === 0) {
      res.json({
        message: "pas de cours pour cette date",
        result: workshops,
      });
    } else {
      res.json({ result: workshops });
    }
  } catch (err) {
    next(err);
  }
};

// ***READ***\\
const read = async (req, res, next) => {
  try {
    const workshop = await tables.workshop.read(req.params.id);

    if (workshop) {
      res.json({ result: workshop });
    } else {
      res.status(404).json({ message: "cours non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

// ***EDIT***\\
const edit = async (req, res, next) => {
  const workshop = { ...req.body, id: req.params.id };

  try {
    await tables.workshop.update(workshop);
    res.status(204).send(`cours modifié avec succès: { id:${req.params.id} }`);
  } catch (err) {
    next(err);
  }
};

// ***ADD***\\
const add = async (req, res, next) => {
  const workshop = req.body;

  try {
    const result = await tables.workshop.create(workshop);
    res.status(201).send(`cours ajouté avec succès: #{ id:${result} }`);
  } catch (err) {
    next(err);
  }
};

// ***DESTROY***\\
const destroy = async (req, res, next) => {
  try {
    await tables.workshop.delete(req.params.id);
    res.status(204).send("cours supprimé avec succès");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  browseByLevel,
  browseByDate,
  read,
  edit,
  add,
  destroy,
};
