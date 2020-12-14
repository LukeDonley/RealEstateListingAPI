const validator = require('validator');
const { Listing, Agent } = require('../models');

const createAgent = async ({ body }, res) => {
  // Validate first_name and last_name are provided
  if (!body.first_name || !body.last_name) {
    return res.status(400).send('first_name and last_name are required');
  }

  // Validate email is valid
  if (!validator.isEmail(body.email))
    return res.status(400).send('Email is not valid');

  // Validate no agent exists with provided email
  if (await emailInUse(body.email)) {
    return res
      .status(400)
      .send(`Agent with email ${body.email} already exists`);
  }

  // Create new agent
  const agent = await Agent.create(body).catch((e) =>
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
  // Validate first_name and last_name are not empty
  if (body.first_name !== undefined && validator.isEmpty(body.first_name))
    return res.status(400).send('first_name cannot be empty');
  if (body.last_name !== undefined && validator.isEmpty(body.last_name))
    return res.status(400).send('last_name cannot be empty');

  // Validate email is valid
  if (body.email !== undefined && !validator.isEmail(body.email))
    return res.status(400).send('Email is not valid');

  // Validate no agent exists with provided email
  if (body.email && (await emailInUse(body.email, id))) {
    return res
      .status(400)
      .send(`Agent with email ${body.email} already exists`);
  }

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

const emailInUse = async (email, id) => {
  const existingAgent = await Agent.findOne({
    where: { email }
  }).catch((e) => false);

  // If no existing user, return false
  if (!existingAgent) return false;

  // If exising user is same as user being updated, return false
  if (id && id == existingAgent.id) return false;

  // Otherwise, we have an existing user with the email, return true
  return true;
};

module.exports = {
  createAgent,
  getAgentById,
  getAllAgents,
  updateAgent,
  deleteAgent
};
