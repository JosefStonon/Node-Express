const CategoryRepository = require('../Repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    const categ = await CategoryRepository.findAll();
    res.json(categ);
  }

  async show(req, res) {
    const { id } = req.params;

    const categ = await CategoryRepository.findById(id);

    if (!categ) {
      res.status(400).json({ error: 'Category not found!' });
    }

    res.json(categ);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(404).json({ error: 'Name is required!' });
    }

    const findByName = await CategoryRepository.findByName(name);

    if (findByName) {
      return res.status(400).json({ error: 'Name is already exists!' });
    }

    const categ = await CategoryRepository.create({ name });

    res.json(categ);
  }

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;

    const categExist = await CategoryRepository.findById(id);

    if (!categExist) {
      return res.status(400).json({ error: 'Category not found!' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required!' });
    }

    const findByName = await CategoryRepository.findByName(name);

    if (findByName) {
      return res.status(400).json({ error: 'Name is already exists!' });
    }

    const categ = await CategoryRepository.Update(id, { name });

    res.json(categ);
  }

  async delete(req, res) {
    const { id } = req.params;

    const categExist = await CategoryRepository.findById(id);

    if (!categExist) {
      return res.status(400).json({ error: 'Category not found!' });
    }

    await CategoryRepository.Delete(id);

    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
