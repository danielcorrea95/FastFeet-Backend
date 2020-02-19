import Deliverers from '../models/Deliverers';
import User from '../models/User';

class DeliverersController {
  async store(req, res) {
    const isProvider = await User.findOne({
      where: { provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({
        error: 'you are not allowed access',
      });
    }

    const emailExists = await Deliverers.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.json({ error: 'Email already registered' });
    }

    try {
      const deliverers = await Deliverers.create(req.body);
      return res.json(deliverers);
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    const deliverersUpdate = await Deliverers.findByPk(req.params.id);

    const isProvider = await User.findOne({
      where: { provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({
        error: 'you are not allowed access',
      });
    }

    const emailExists = await Deliverers.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.json({ error: 'Email already registered' });
    }

    const { name, email } = await deliverersUpdate.update(req.body);
    return res.json({
      name,
      email,
    });
  }

  async index(req, res) {
    const listDeliverers = await Deliverers.findAll();
    return res.json(listDeliverers);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliverer = await Deliverers.findByPk(id);

    if (!deliverer) {
      return res.status(404).json({
        error: 'Non-existent delivery man',
      });
    }
    await deliverer.destroy();

    const listDeliverers = await Deliverers.findAll();

    return res.json(listDeliverers);
  }
}

export default new DeliverersController();
