const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'josef',
    email: 'josef.sartori@hotmail.com',
    phone: '986873465',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
