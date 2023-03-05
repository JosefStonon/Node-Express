const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'josef',
    email: 'josef@hotmail.com',
    phone: '8576895734',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'amanda',
    email: 'amanda@hotmail.com',
    phone: '85768534595734',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'lorenzo',
    email: 'lorenzo@hotmail.com',
    phone: '8574356895734',
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

  deleteById(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);

      resolve();
    });
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
}

module.exports = new ContactRepository();
