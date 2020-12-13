const { Listing, Agent } = require('../models');

const createListing = async (req, res) => {
  const listing = await Listing.create({
    mls_number: req.body.mls_number,
    address_line_1: req.body.address_line_1,
    address_line_2: req.body.address_line_2,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
    asking_price: req.body.asking_price
  }).catch((e) => {
    return res.status(500).json({ error: error.message });
  });

  if (req.body.agent_ids) {
    // Find agents with provided IDs, add agents to listings
    req.body.agent_ids.forEach(async (agent_id) => {
      const agent = await Agent.findByPk(agent_id).catch((e) =>
        res.status(500).send(e)
      );
      if (agent) listing.addAgent(agent);
    });
  }

  return res.status(201).json({ listing });
};

const addAgent = async ({ body, params: { mls_number } }, res) => {
  const listing = await Listing.findOne({ where: { mls_number } }).catch(
    (e) => {
      return res.status(500).json({ error: error.message });
    }
  );

  if (!listing) res.status(404).send('Listing Not Found');

  const agent = await Agent.findByPk(body.agent_id).catch((e) => {
    return res.status(500).json({ error: error.message });
  });

  if (!agent) res.status(404).send('Agent Not Found');

  return res
    .status(200)
    .send(await listing.addAgent(agent).catch((e) => res.status(500).send(e)));
};

const removeAgent = async ({ body, params: { mls_number } }, res) => {
  const listing = await Listing.findOne({ where: { mls_number } }).catch(
    (e) => {
      return res.status(500).json({ error: error.message });
    }
  );

  if (!listing) res.status(404).send('Listing Not Found');

  const agent = await Agent.findByPk(body.agent_id).catch((e) => {
    return res.status(500).json({ error: error.message });
  });

  if (!agent) res.status(404).send('Agent Not Found');

  return res
    .status(204)
    .send(
      await listing.removeAgent(agent).catch((e) => res.status(500).send(e))
    );
};

const getListings = async (req, res) => {
  const query = req.query;
  const listings = await Listing.findAll({
    where: query,
    include: [{ model: Agent }]
  }).catch((e) => res.status(500).send(e.message));

  return res.status(200).json({ listings });
};

const getListingByMlsNumber = async ({ params: { mls_number } }, res) => {
  const listing = await Listing.findOne({
    where: { mls_number },
    include: [{ model: Agent }]
  }).catch((e) => res.status(500).send(e.message));

  if (!listing) return res.status(404).send('Listing not found');

  return res.status(200).json({ listing });
};

const updateListing = async ({ body, params: { mls_number } }, res) => {
  const [updated] = await Listing.update(body, {
    where: { mls_number }
  }).catch((e) => res.status(500).json({ error: e.message }));

  if (updated) {
    const updatedListing = await Listing.findOne({ where: { mls_number } });

    return res.status(200).json({ updatedListing });
  }
  return res.status(404).send('Listing not found');
};

const deleteListing = async ({ params: { mls_number } }, res) => {
  const deleted = await Listing.destroy({
    where: { mls_number }
  }).catch((e) => res.status(500).send(e.message));

  if (deleted) return res.status(204).send('Listing deleted');
  return res.status(404).send('Listing not found');
};

module.exports = {
  createListing,
  getListingByMlsNumber,
  getListings,
  updateListing,
  addAgent,
  removeAgent,
  deleteListing
};
