const AbstractRepository = require("./AbstractRepository");

class LocationRepository extends AbstractRepository {
  constructor() {
    super({ table: "location" });
  }

  // ***CREATE***\\

  async create(location) {
    const [result] = await this.database.query(
      `insert into ${this.table} (room, capacity, address, city, postCode, country) values (?, ?,? ,?, ?, ?)`,
      [
        location.room,
        location.capacity,
        location.address,
        location.city,
        location.postCode,
        location.country,
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

  async readAllByCity(city) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where city = ?`,
      [city]
    );

    return rows;
  }

  // ***UPDATE***\\
  async update(location) {
    const [result] = await this.database.query(
      `update ${this.table} set room = ?, capacity = ?, address = ?, city = ?, postCode = ?, country = ? where id = ?`,
      [
        location.room,
        location.capacity,
        location.address,
        location.city,
        location.postCode,
        location.country,
        location.id,
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

module.exports = LocationRepository;
