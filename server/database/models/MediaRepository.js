const AbstractRepository = require("./AbstractRepository");

class MediaRepository extends AbstractRepository {
    constructor() {
        // Call the constructor of the parent class (AbstractRepository)
        // and pass the table name "media" as configuration
        super({ table: "media" });
    }

    // The C of CRUD - Create operation

    async create(media) {
        // Execute the SQL INSERT query to add a new media to the "media" table
        const [result] = await this.database.query(
            `insert into ${this.table} (type, description, url) values (?, ?,?)`,
            [media.type, media.description, media.url, media.id]
        );

        // Return the ID of the newly inserted media
        return result.insertId;
    }

    // The Rs of CRUD - Read operations

    async read(id) {
        // Execute the SQL SELECT query to retrieve a specific media by its ID
        const [rows] = await this.database.query(
            `select * from ${this.table} where id = ?`,
            [id]
        );

        // Return the first row of the result, which represents the media
        return rows[0];
    }

    async readAll() {
        // Execute the SQL SELECT query to retrieve all medias from the "media" table
        const [rows] = await this.database.query(`select * from ${this.table}`);

        // Return the array of medias
        return rows;
    }

    async update(media) {
        const [result] = await this.database.query(
            `update ${this.table} set type = ?, description = ?, url = ? where id = ?`,
            [media.type, media.description, media.url, media.id]

        );

        // Return the number of affected rows
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await this.database.query(
            `delete from ${this.table} where id = ?`,
            [id]
        );

        // Return the number of affected rows
        return result.affectedRows;
    }
}

module.exports = MediaRepository;
