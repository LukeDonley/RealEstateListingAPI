const { Listing, Agent } = require('../models');

const createAgent = async (req, res) => {
  const agent = await Agent.create(req.body).catch((e) =>
    res.status(500).json({ error: e.message })
  );

  return res.status(201).json({ agent });
};

const getAllAgents = async (req, res) => {
  const agents = await Agent.findAll({
    include: [{ model: Listing }]
  }).catch((e) => res.status(500).send({ error: e.message }));

  return res.status(200).json({ agents });
};

const getAgentById = async ({ params: { id } }, res) => {
  const agent = await Agent.findOne({
    where: { id: id },
    include: [{ model: Listing }]
  }).catch((e) => res.status(500).send({ error: e.message }));

  if (!agent) return res.status(404).send('Agent not found');

  return res.status(200).json({ agent });
};

const updateAgent = async ({ body, params: { id } }, res) => {
  const [updated] = await Agent.update(body, {
    where: { id: id }
  }).catch((e) => res.status(500).send({ error: e.message }));

  if (!updated) return res.status(404).send('Agent not updated');

  const updatedAgent = await Agent.findByPk(id);
  return res.status(200).json({ updatedAgent });
};

const deleteAgent = async ({ params: { id } }, res) => {
  const deleted = await Agent.destroy({
    where: { id: id }
  }).catch((e) => res.status(500).send({ error: e.message }));

  if (!deleted) return res.status(404).send('Agent not found');

  return res.status(204).send('Agent deleted');
};

module.exports = {
  createAgent,
  getAgentById,
  getAllAgents,
  updateAgent,
  deleteAgent
};
