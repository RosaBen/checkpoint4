const AbstractRepository = require("./AbstractRepository");

class WorkshopRepository extends AbstractRepository {
    constructor() {
        // Call the constructor of the parent class (AbstractRepository)
        // and pass the table name "workshop" as configuration
        super({ table: "workshop" });
    }

    // The C of CRUD - Create operation

    async create(workshop) {
        // Execute the SQL INSERT query to add a new workshop to the "workshop" table
        const [result] = await this.database.query(
            `insert into ${this.table} (location, workshopDate, duration,workshopTime, capacity ) 
            values (?, STR_TO_DATE(?, '%d-%m-%Y'),?,STR_TO_DATE(?, '%H:%i'),?)`,
            [workshop.location, workshop.workshopDate, workshop.duration, workshop.workshopTime, workshop.capacity, workshop.id]
        );

        // Return the ID of the newly inserted workshop
        return result.insertId;
    }

    // The Rs of CRUD - Read operations

    async read(id) {
        // Execute the SQL SELECT query to retrieve a specific workshop by its ID
        const [rows] = await this.database.query(
            `select             location,
            DATE_FORMAT(workshopDate,'%d-%m-%Y') as dateFR,
            duration,
            DATE_FORMAT(workshopTime,'%H:%i') as timeFR,
            capacity from ${this.table} where id = ?`,
            [id]
        );

        // Return the first row of the result, which represents the workshop
        return rows[0];
    }

    async readAll() {
        // Execute the SQL SELECT query to retrieve all workshops from the "workshop" table
        const [rows] = await this.database.query(`
        SELECT 
            location, 
            DATE_FORMAT(workshopDate,'%d-%m-%Y') as dateFR, 
            duration, 
            DATE_FORMAT(workshopTime,'%H:%i') as timeFR, 
            capacity
        FROM ${this.table}
    `);

        // Return the array of workshops
        return rows;
    }


    async update(workshop) {
        const [result] = await this.database.query(
            `update ${this.table} set location = ?, 
            workshopDate = STR_TO_DATE(?, '%d-%m-%Y'), 
            duration = ?, 
            workshopTime = STR_TO_DATE(?, '%H:%i'), 
            capacity= ?  
            where id = ?`,
            [workshop.location,
            workshop.workshopDate,
            workshop.duration,
            workshop.workshopTime,
            workshop.capacity,
            workshop.id]
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

module.exports = WorkshopRepository;
