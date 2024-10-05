const AbstractRepository = require("./AbstractRepository");

class StudentRepository extends AbstractRepository {
  constructor() {
    super({ table: "student" });
  }

  // ***CREATE***\\
  async create(student) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, phone, level) values (?, ?, ?, ?, ?)`,
      [
        student.firstname,
        student.lastname,
        student.email,
        student.phone,
        student.level,
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
  async update(student) {
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, phone = ? , level= ?  where id = ?`,
      [
        student.firstname,
        student.lastname,
        student.email,
        student.phone,
        student.level,
        student.id,
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

module.exports = StudentRepository;
