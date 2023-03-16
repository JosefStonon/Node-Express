const ContactRepository = require('../Repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contact = await ContactRepository.findAll(orderBy);

    res.json(contact);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      res.status(404).json({ error: 'Contact not found!' });
    }

    res.json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExist = await ContactRepository.findByEmail(email);

    if (contactExist) {
      res.status(404).json({ error: 'This contact is already in use!' });
    }

    if (!name) {
      res.status(404).json({ error: 'Name is required!' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExist = await ContactRepository.findById(id);

    if (!contactExist) {
      res.status(404).json({ error: 'Contact not found!' });
    }

    if (!name) {
      res.status(404).json({ error: 'Name is required!' });
    }

    const contactExistEmail = await ContactRepository.findByEmail(email);

    if (contactExistEmail && contactExistEmail.id !== id) {
      res.status(404).json({ error: 'This Email is already in use!' });
    }

    const contact = await ContactRepository.Update(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    const contactExist = await ContactRepository.findById(id);

    if (!contactExist) {
      res.status(404).json({ error: 'Contact not found!' });
    }

    await ContactRepository.Delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();
