const { v4 } = require('uuid');

const db = require('../../DataBase');

let contacts = [
  {
    id: v4(),
    name: 'jose',
    email: 'jose@email.com',
    phone: '843658743',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'vitor',
    email: 'vitor@email.com',
    phone: '843654238743',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'maria',
    email: 'maria@email.com',
    phone: '843652438743',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {

  }

  findById(id) {

  }

  findByEmail(email) {

  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
                                VALUES($1, $2, $3, $4)
                                RETURNING *
                                `, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }

  deleteById(id) {

  }
}

module.exports = new ContactRepository();
