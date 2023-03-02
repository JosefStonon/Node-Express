const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'josef',
    email: 'josef.sartori@hotmail.com',
    phone: '879365352',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'maria',
    email: 'maria@hotmail.com',
    phone: '87935365352',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'tiao',
    email: 'tiao@hotmail.com',
    phone: '872349365352',
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

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
