const { v4 } = require('uuid');

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

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      contacts.push(newContact);

      resolve(newContact);
    });
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
