import * as Yup from 'yup';
import Recipients from '../models/Recipients';
import User from '../models/User';

class RecipientsController {
  async store(req, res) {
    const isProvider = await User.findOne({
      where: { provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'you are not allowed to register recipients' });
    }

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
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, street, number } = req.body;
    const recipients = await Recipients.findByPk(req.params.id);

    const isProvider = await User.findOne({
      where: { provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You are not allowed to update recipients' });
    }

    if (
      name === recipients.name &&
      street === recipients.street &&
      number === recipients.number
    ) {
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
    }

    if (email && email !== recipients.email) {
      const userExists = await Recipients.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'E-mail already registered' });
      }
    }
    const { complement, state, city, zip_code } = await recipients.update(
      req.body
    );
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
}

export default new RecipientsController();
