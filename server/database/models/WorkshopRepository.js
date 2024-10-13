const AbstractRepository = require("./AbstractRepository");

class WorkshopRepository extends AbstractRepository {
  constructor() {
    super({ table: "workshop" });
  }

  // ***CREATE***\\
  async create(workshop) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (workshopDate, duration, workshopTime, level, locationId) 
       VALUES (STR_TO_DATE(?, '%Y-%m-%d'), ?, STR_TO_DATE(?, '%H:%i:%s'), ?, ?);`,
      [
        workshop.workshopDate,
        workshop.duration,
        workshop.workshopTime,
        workshop.level,
        workshop.locationId,
      ]
    );

    return result.insertId;
  }

  // ***READ***\\
  async read(id) {
    const [rows] = await this.database.query(
      `SELECT       
        DATE_FORMAT(workshopDate, '%W %d %M %Y') as workshopDate,
        duration,
        DATE_FORMAT(workshopTime, '%Hh%i') as workshopTime,
        level,
        locationId,
        workshop.id
      FROM ${this.table}
      WHERE id = ?;`,
      [id]
    );

    return rows[0];
  }

  // ***READ ALL WITH FILTERS (DATE & LEVEL)***\\
  async readAll(level, workshopDate) {
    let query = `
      SELECT
        DATE_FORMAT(workshopDate, '%W %d %M %Y') as workshopDate,
        duration,
        DATE_FORMAT(workshopTime, '%Hh%i') as workshopTime,
        level,
        locationId,
        workshop.id
      FROM ${this.table}
      INNER JOIN location ON ${this.table}.locationId = location.id`;

    const values = [];
    const conditions = [];

    if (level) {
      conditions.push("level = ?");
      values.push(level);
    }

    if (workshopDate) {
      conditions.push("workshopDate = STR_TO_DATE(?, '%Y-%m-%d')");
      values.push(workshopDate);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const [rows] = await this.database.query(query, values);
    return rows;
  }

  // ***READ BY DATE***\\
  async readAllByDate(workshopDate) {
    const [rows] = await this.database.query(
      `SELECT 
        DATE_FORMAT(workshopDate, '%W %d %M %Y') as workshopDate,
        duration,
        DATE_FORMAT(workshopTime, '%Hh%i') as workshopTime,
        level,
        locationId,
        workshop.id
      FROM ${this.table}
      WHERE workshopDate = STR_TO_DATE(?, '%Y-%m-%d');`,
      [workshopDate]
    );

    return rows;
  }

  // ***UPDATE***\\
  async update(workshop) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}
       SET workshopDate = STR_TO_DATE(?, '%Y-%m-%d'), 
           duration = ?, 
           workshopTime = STR_TO_DATE(?, '%H:%i:%s'), 
           level = ?, 
           locationId = ? 
       WHERE id = ?;`,
      [
        workshop.workshopDate,
        workshop.duration,
        workshop.workshopTime,
        workshop.level,
        workshop.locationId,
        workshop.id,
      ]
    );

    return result.affectedRows;
  }

  // ***DELETE***\\
  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?;`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = WorkshopRepository;
