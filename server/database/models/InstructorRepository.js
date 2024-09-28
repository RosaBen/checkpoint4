const AbstractRepository = require("./AbstractRepository");

class InstructorRepository extends AbstractRepository {
    constructor() {
        // Call the constructor of the parent class (AbstractRepository)
        // and pass the table name "instructor" as configuration
        super({ table: "instructor" });
    }

    // The C of CRUD - Create operation

    async create(instructor) {
        // Execute the SQL INSERT query to add a new instructor to the "instructor" table
        const [result] = await this.database.query(
            `insert into ${this.table} (firstname, lastname, email,phone, description, picture ) values (?, ?,?,?,?,?)`,
            [instructor.firstname, instructor.lastname, instructor.email, instructor.phone, instructor.description, instructor.picture, instructor.id]
        );

        // Return the ID of the newly inserted instructor
        return result.insertId;
    }

    // The Rs of CRUD - Read operations

    async read(id) {
        // Execute the SQL SELECT query to retrieve a specific instructor by its ID
        const [rows] = await this.database.query(
            `select * from ${this.table} where id = ?`,
            [id]
        );

        // Return the first row of the result, which represents the instructor
        return rows[0];
    }

    async readAll() {
        // Execute the SQL SELECT query to retrieve all instructors from the "instructor" table
        const [rows] = await this.database.query(`select * from ${this.table}`);

        // Return the array of instructors
        return rows;
    }

    async update(instructor) {
        const [result] = await this.database.query(
            `update ${this.table} set firstname = ?, lastname = ?, email = ?, phone = ? , description= ?, picture=?  where id = ?`,
            [instructor.firstname,
            instructor.lastname,
            instructor.email,
            instructor.phone,
            instructor.description,
            instructor.picture,
            instructor.id]
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

module.exports = InstructorRepository;
