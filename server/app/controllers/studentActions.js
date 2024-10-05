// Import access to database tables
const tables = require("../../database/tables");

// ***READ***\\

const browse = async (req, res, next) => {
  try {
    const students = await tables.student.readAll();
    if (students.length === 0) {
      res.json({
        message: "pas d'élèves ",
        result: students,
      });
    } else {
      res.json({ result: students });
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const student = await tables.student.read(req.params.id);

    if (student) {
      res.json({ result: student });
    } else {
      res.status(404).json({ message: "élève non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

const browseByLevel = async (req, res, next) => {
  try {
    const students = await tables.student.readAllByLevel(req.params.level);
    if (students.length === 0) {
      res.json({
        message: "pas d'élèves pour ce niveau",
        result: students,
      });
    } else {
      res.json({ result: students });
    }
  } catch (err) {
    next(err);
  }
};

// ***EDIT***\\

const edit = async (req, res, next) => {
  const student = { ...req.body, id: req.params.id };
  console.info("actions", student);
  try {
    await tables.student.update(student);
    res.status(204).send(`élève modifié avec succès: { id:${req.params.id} }`);
  } catch (err) {
    next(err);
  }
};

// ***ADD***\\
const add = async (req, res, next) => {
  const student = req.body;

  try {
    const result = await tables.student.create(student);
    res.status(201).send(`élève ajouté avec succès: #{ id:${result} }`);
  } catch (err) {
    next(err);
  }
};

// ***DESTROY***\\

const destroy = async (req, res, next) => {
  try {
    await tables.student.delete(req.params.id);
    res.status(204).send("élève supprimé avec succès");
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  browseByLevel,
  read,
  edit,
  add,
  destroy,
};
