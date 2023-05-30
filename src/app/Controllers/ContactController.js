
const isValidUUID = require('../../app/utils/isValidUUID')
const ContactRepository = require('../Repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contact = await ContactRepository.findAll(orderBy);

    res.json(contact);
  }

  async show(req, res) {
    const { id } = req.params;

    if ( !isValidUUID(id)) {
        return response.status(400).json({error: 'Contact not found'})
    }

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

    if (!name) {
      res.status(404).json({ error: 'Name is required!' });
    }

    if (category_id && !isValidUUID(category_id)) {
        return response.status(400).json({error: 'Invalid category Id'})
    }



    if (email) {

        const contactExist = await ContactRepository.findByEmail(email);

        if (contactExist) {
          res.status(404).json({ error: 'this Email is already in use!' });
        }
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    if ( !isValidUUID(id)) {
        return response.status(400).json({error: 'Contact not found'})
    }

    if (category_id && !isValidUUID(category_id)) {
        return response.status(400).json({error: 'Invalid category Id'})
    }

    if (!name) {
        res.status(404).json({ error: 'Name is required!' });
      }

    const updateExist = await ContactRepository.findById(id);

    if (!updateExist) {
      res.status(404).json({ error: 'Contact not found!' });
    }


    if ( email ) {
        const EmailExist = await ContactRepository.findByEmail(email);

        if (EmailExist && EmailExist.id !== id) {
          res.status(404).json({ error: 'This Email is already in use!' });
        }
    }


    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    if ( !isValidUUID(id)) {
        return response.status(400).json({error: 'Contact not found'})
    }

    await ContactRepository.Delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();
