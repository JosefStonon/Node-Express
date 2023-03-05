const ContactRepository = require('../Repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const contact = await ContactRepository.findAll();
    res.json(contact);
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      res.status(404, { error: 'User not found!' });
    }

    res.status(200).json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'This e-mail is already been taken' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      res.status(404).json({ error: 'User not Exist' });
    }

    await ContactRepository.deleteById(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();
