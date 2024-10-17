// Import access to database tables
const tables = require("../../database/tables");

// ***READ***\\

const browse = async (req, res, next) => {
    try {
        const instructors = await tables.instructor.readAll();
        if (instructors.length === 0) {
            res.json({
                message: "pas d'instructeurs trouvés",
                result: instructors,
            });
        } else {
            res.json({ result: instructors });
        }
    } catch (err) {
        next(err);
    }
};

const read = async (req, res, next) => {
    try {
        const instructor = await tables.instructor.read(req.params.id);

        if (instructor) {
            res.json({ result: instructor });
        } else {
            res.status(404).json({ message: "instructeur non trouvé" });
        }
    } catch (err) {
        next(err);
    }
};

// ***EDIT***\\

const edit = async (req, res, next) => {
    const instructor = { ...req.body, id: req.params.id };
    console.info("actions", instructor);
    try {
        await tables.instructor.update(instructor);
        res.status(204).send(`instructeur  modifié avec succès: { id:${req.params.id} }`);
    } catch (err) {
        next(err);
    }
};

// ***ADD***\\
const add = async (req, res, next) => {
    const instructor = req.body;

    try {

        if (req.file) {
            instructor.photo = req.file.filename;
        }
        const result = await tables.instructor.create(instructor);
        res.status(201).send(`instructeur  ajouté avec succès: #{ id:${result} }`);
    } catch (err) {
        next(err);
    }
};

// ***DESTROY***\\

const destroy = async (req, res, next) => {
    try {
        await tables.instructor.delete(req.params.id);
        res.status(204).send("instructeur  supprimé avec succès");
    } catch (err) {
        next(err);
    }
};

// Ready to export the controller functions
module.exports = {
    browse,
    read,
    edit,
    add,
    destroy,
};
