const { v4 } = require('uuid');

const db = require('../../DataBase');

let contacts = [
  {
    id: v4(),
    name: 'jose',
    email: 'jose@email.com',
    phone: '756385623',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'maria',
    email: 'maria@email.com',
    phone: '756sff385623',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'joao',
    email: 'joao@email.com',
    phone: '756385435623',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`INSERT INTO contacts(name, email, phone, category_id)
                          VALUES($1, $2, $3, $4)
                          RETURNING *`, [name, email, phone, category_id]);

    return row;
  }

  upDate(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const upDateContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? upDateContact : contact
      ));

      resolve(upDateContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
