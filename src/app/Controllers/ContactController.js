const ContactRepsitory = require('../Repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const contact = await ContactRepsitory.findAll();
    res.json(contact);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactRepsitory.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not exists!' });
    }

    res.json(contact);
  }

  async store(req, res) {
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactRepsitory.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'This email is already been taken!' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const contact = await ContactRepsitory.create({
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactRepsitory.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: 'Contact not found!' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactRepsitory.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use!' });
    }

    const contact = await ContactRepsitory.update(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    const contact = await ContactRepsitory.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not exists!' });
    }

    await ContactRepsitory.deleteById(id);

    res.sendStatus(200);
  }
}

module.exports = new ContactController();
