const AbstractRepository = require("./AbstractRepository");

class InstructorRepository extends AbstractRepository {
  constructor() {
    super({ table: "instructor" });
  }

  // ***CREATE***\\
  async create(instructor) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, phone, description, photo) values (?, ?,?, ?, ?, ?)`,
      [
        instructor.firstname,
        instructor.lastname,
        instructor.email,
        instructor.phone,
        instructor.description,
        instructor.photo,
      ]
    );

    return result.insertId;
  }

  // ***READ***\\

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async readAllByLevel(level) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where level = ?`,
      [level]
    );

    return rows;
  }

  // ***UPDATE***\\
  async update(instructor) {
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, phone = ? , description=?, photo=?  where id = ?`,
      [
        instructor.firstname,
        instructor.lastname,
        instructor.email,
        instructor.phone,
        instructor.description,
        instructor.photo,
        instructor.id,
      ]
    );

    return result.affectedRows;
  }

  // ***DELETE***\\
  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = InstructorRepository;
