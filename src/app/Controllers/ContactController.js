const ContactRepository = require('../Repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contact = await ContactRepository.findAll(orderBy);
    res.json(contact);
  }

  async show(req, res) {
    const { id } = req.params;

    const findId = await ContactRepository.findById(id);

    if (!findId) {
      return res.status(404).json({ error: 'Contact not found!' });
    }

    res.json(findId);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactEmail = await ContactRepository.findByEmail(email);

    if (contactEmail) {
      res.status(404).json({ error: 'This Email is already in use!' });
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
      return res.status(404).json({ error: 'Contact is already in use!' });
    }

    if (!name) {
      return res.status(404).json({ error: 'Name is required!' });
    }

    const contactEmail = await ContactRepository.findByEmail(email);

    if (contactEmail && contactEmail !== email) {
      return res.status(404).json({ error: 'This Email is already in use!' });
    }

    const contact = await ContactRepository.upDate(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    await ContactRepository.delete(id);

    res.sendStatus(200);
  }
}

module.exports = new ContactController();
