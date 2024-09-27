const AbstractRepository = require("./AbstractRepository");

class StudentRepository extends AbstractRepository {
    constructor() {
        // Call the constructor of the parent class (AbstractRepository)
        // and pass the table name "student" as configuration
        super({ table: "student" });
    }

    // The C of CRUD - Create operation

    async create(student) {
        // Execute the SQL INSERT query to add a new student to the "student" table
        const [result] = await this.database.query(
            `insert into ${this.table} (firstname, lastname, email,phone, level ) values (?, ?,?,?,?)`,
            [student.firstname, student.lastname, student.email, student.phone, student.level, student.id]
        );

        // Return the ID of the newly inserted student
        return result.insertId;
    }

    // The Rs of CRUD - Read operations

    async read(id) {
        // Execute the SQL SELECT query to retrieve a specific student by its ID
        const [rows] = await this.database.query(
            `select * from ${this.table} where id = ?`,
            [id]
        );

        // Return the first row of the result, which represents the student
        return rows[0];
    }

    async readAll() {
        // Execute the SQL SELECT query to retrieve all students from the "student" table
        const [rows] = await this.database.query(`select * from ${this.table}`);

        // Return the array of students
        return rows;
    }

    async update(student) {
        const [result] = await this.database.query(
            `update ${this.table} set firstname = ?, lastname = ?, email = ?, phone = ? , level= ?  where id = ?`,
            [student.firstname,
            student.lastname,
            student.email,
            student.phone,
            student.level,
            student.id]
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

module.exports = StudentRepository;
