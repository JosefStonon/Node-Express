const ContactRepository = require('../Repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactRepository.findAll();
    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User not found!' });
    }

    res.json(contact);
  }

  store() {

  }

  update() {

  }

  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'User not found!' });
    }

    await ContactRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();
