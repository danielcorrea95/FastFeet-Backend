import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const recipientsExists = await Recipients.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
      },
    });

    if (recipientsExists) {
      return res.status(400).json({ error: 'Address already registered' });
    }

    const {
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipients.create(req.body);
    return res.json({
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new RecipientsController();
