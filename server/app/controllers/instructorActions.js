// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
    try {
        // Fetch all instructors from the database
        const instructors = await tables.instructor.readAll();
        if (instructors.length === 0) {
            res.json({
                message: "pas d'instructeurs ",
                result: instructors,
            });
        } else {
            res.json({ result: instructors });
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
    try {
        // Fetch a specific instructor from the database based on the provided ID
        const instructor = await tables.instructor.read(req.params.id);

        if (instructor) {
            res.json({ result: instructor });
        } else {
            res.status(404).json({ message: "instructeur non trouvé" });
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
    const instructor = { ...req.body, id: req.params.id };

    try {

        if (req.file) {
            instructor.picture = req.file.filename;
        }
        await tables.instructor.update(instructor);
        res
            .status(204)
            .send(`instructeur modifié avec succès: { id:${req.params.id} }`);
    } catch (err) {
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
    // Extract the instructor data from the request body
    const instructor = req.body;

    try {
        if (req.file) {
            instructor.picture = req.file.filename;
        }
        const result = await tables.instructor.create(instructor);
        res.status(201).send(`instructeur ajouté avec succès: #{ id:${result} }`);
    } catch (err) {
        next(err);
    }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
    try {
        await tables.instructor.delete(req.params.id);
        res.status(204)
            .send("instructeur supprimé avec succès");
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
