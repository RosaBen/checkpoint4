// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
    try {
        // Fetch all medias from the database
        const medias = await tables.media.readAll();
        if (medias.length === 0) {
            res.json({
                message: "pas de médias trouvés",
                result: medias,
            });
        } else {
            res.json({ result: medias });
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
    try {
        // Fetch a specific media from the database based on the provided ID
        const media = await tables.media.read(req.params.id);

        if (media) {
            res.json({ result: media });
        } else {
            res.status(404).json({ message: "media non trouvé" });
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
    const media = { ...req.body, id: req.params.id };

    try {
        await tables.media.update(media);
        res
            .status(204)
            .send(`media modifié avec succès: { id:${req.params.id} }`);
    } catch (err) {
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
    // Extract the media data from the request body
    const media = req.body;

    try {
        const result = await tables.media.create(media);
        res.status(201).send(`media ajouté avec succès: #{ id:${result} }`);
    } catch (err) {
        next(err);
    }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
    try {
        await tables.media.delete(req.params.id);
        res.status(204)
            .send("media supprimé avec succès");
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
