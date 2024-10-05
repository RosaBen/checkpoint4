const AbstractRepository = require("./AbstractRepository");

class WorkshopRepository extends AbstractRepository {
  constructor() {
    super({ table: "workshop" });
  }

  // ***CREATE***\\
  async create(workshop) {
    const [result] = await this.database.query(
      `insert into ${this.table} (workshopDate, duration,workshopTime,description,level,locationId) 
            values (STR_TO_DATE(?, '%Y-%m-%d'),?,STR_TO_DATE(?, '%H:%i:%s'),?,?,?)
            `,
      [
        workshop.workshopDate,
        workshop.duration,
        workshop.workshopTime,
        workshop.description,
        workshop.level,
        workshop.locationId,
      ]
    );

    return result.insertId;
  }

  // ***READ***\\
  async read(id) {
    const [rows] = await this.database.query(
      `select       
            DATE_FORMAT(workshopDate,'%W %d %M %Y') as workshopDate,
            duration,
            DATE_FORMAT(workshopTime,'%Hh%i') as workshopTime,
            description,
            level,
            locationId
            from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll(level, workshopDate) {
    let query = `select
        DATE_FORMAT(workshopDate,'%W %d %M %Y') as workshopDate,
        duration,
        DATE_FORMAT(workshopTime,'%Hh%i') as workshopTime,
        description,
        level,
        locationId
        from ${this.table}`;

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
      query += ` where ${conditions.join(" or ")}`;
    }

    const [rows] = await this.database.query(query, values);
    return rows;
  }

  async readAllByDate(workshopDate) {
    const [rows] = await this.database.query(
      `select 
        DATE_FORMAT(workshopDate,'%W %d %M %Y') as workshopDate,
        duration,
        DATE_FORMAT(workshopTime,'%Hh%i') as workshopTime,
        description,
        level,
        locationId
        from ${this.table} where workshopDate = (STR_TO_DATE(?, '%Y-%m-%d'))`,
      [workshopDate]
    );

    return rows;
  }

  // ***UPDATE***\\
  async update(workshop) {
    const [result] = await this.database.query(
      `update ${this.table} set workshopDate = STR_TO_DATE(?, '%Y-%m-%d'), duration = ?, workshopTime = STR_TO_DATE(?, '%H:%i:%s'), description = ?, level = ?, locationId = ? where id = ?`,
      [
        workshop.workshopDate,
        workshop.duration,
        workshop.workshopTime,
        workshop.description,
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
      `delete from ${this.table} where id = ? `,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = WorkshopRepository;
