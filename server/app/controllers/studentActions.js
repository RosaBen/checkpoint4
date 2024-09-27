// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
    try {
        // Fetch all students from the database
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
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
    try {
        // Fetch a specific student from the database based on the provided ID
        const student = await tables.student.read(req.params.id);

        if (student) {
            res.json({ result: student });
        } else {
            res.status(404).json({ message: "élève non trouvé" });
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
    const student = { ...req.body, id: req.params.id };

    try {
        await tables.student.update(student);
        res
            .status(204)
            .send(`élève modifié avec succès: { id:${req.params.id} }`);
    } catch (err) {
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
    // Extract the student data from the request body
    const student = req.body;

    try {
        const result = await tables.student.create(student);
        res.status(201).send(`élève ajouté avec succès: #{ id:${result} }`);
    } catch (err) {
        next(err);
    }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
    try {
        await tables.student.delete(req.params.id);
        res.status(204)
            .send("élève supprimé avec succès");
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
