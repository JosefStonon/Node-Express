const db = require('../../DataBase/index');

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const dirction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
            SELECT contacts.* categories.name AS category_name
            FROM contacts
            JOIN categories ON categories.id = category_id
            ORDER BY contacts.name ${dirction}
        `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
        SELECT * FROM contacts WHERE id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
        SELECT * FROM contacts WHERE email = $1
    `, [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
        INSERT INTO contacts(name, email, phone, category_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
    `, [name, email, phone, category_id]);
    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
        UPDATE contacts
        SET name = $1, email = $2, phone = $3, category_id = $4
        WHERE id = $5
        RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  async Delete(id) {
    const deletObj = await db.query(`
        DELETE FROM contacts WHERE id = $1
    `, [id]);
    return deletObj;
  }
}

module.exports = new ContactRepository();
