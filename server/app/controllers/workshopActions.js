// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
    try {
        // Fetch all workshops from the database
        const workshops = await tables.workshop.readAll();
        if (workshops.length === 0) {
            res.json({
                message: "pas de cours ",
                result: workshops,
            });
        } else {
            res.json({ result: workshops });
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
    try {
        // Fetch a specific workshop from the database based on the provided ID
        const workshop = await tables.workshop.read(req.params.id);

        if (workshop) {
            res.json({ result: workshop });
        } else {
            res.status(404).json({ message: "cours non trouvé" });
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
    const workshop = { ...req.body, id: req.params.id };

    try {
        await tables.workshop.update(workshop);
        res
            .status(204)
            .send(`cours modifié avec succès: { id:${req.params.id} }`);
    } catch (err) {
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
    // Extract the workshop data from the request body
    const workshop = req.body;

    try {
        const result = await tables.workshop.create(workshop);
        res.status(201).send(`cours ajouté avec succès: #{ id:${result} }`);
    } catch (err) {
        next(err);
    }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
    try {
        await tables.workshop.delete(req.params.id);
        res.status(204)
            .send("cours supprimé avec succès");
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
