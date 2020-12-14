const { Listing, Agent } = require('../models');

const createListing = async ({ body }, res) => {
  const existingListing = await Listing.findOne({
    where: { mls_number: body.mls_number }
  }).catch((e) => res.status(500).json({ error: e.message }));

  // Validate no listings exist with mls_number
  if (existingListing)
    return res
      .status(400)
      .send(`Listing with MLS Number ${body.mls_number} already exists`);

  const listing = await Listing.create({
    mls_number: body.mls_number,
    address_line_1: body.address_line_1,
    address_line_2: body.address_line_2,
    city: body.city,
    state: body.state,
    postal_code: body.postal_code,
    asking_price: body.asking_price,
    listing_date: body.listing_date
  }).catch((e) => res.status(500).json({ error: error.message }));

  if (body.agent_ids) {
    // Find agents with provided IDs, add agents to listings
    body.agent_ids.forEach(async (agent_id) => {
      const agent = await Agent.findByPk(agent_id).catch((e) =>
        res.status(500).send(e)
      );
      if (agent) listing.addAgent(agent);
    });
  }

  return res.status(201).json({ listing });
};

const addAgent = async ({ body, params: { mls_number } }, res) => {
  const listing = await Listing.findOne({
    where: { mls_number }
  }).catch((e) => res.status(500).json({ error: error.message }));

  if (!listing) res.status(404).send('Listing Not Found');

  const agent = await Agent.findByPk(body.agent_id).catch((e) =>
    res.status(500).json({ error: error.message })
  );

  if (!agent) res.status(404).send('Agent Not Found');

  await listing
    .addAgent(agent)
    .catch((e) => res.status(500).json({ error: e.message }));

  return res.status(200).send({ listing });
};

const removeAgent = async ({ body, params: { mls_number } }, res) => {
  const listing = await Listing.findOne({
    where: { mls_number }
  }).catch((e) => res.status(500).json({ error: error.message }));

  if (!listing) return res.status(404).send('Listing Not Found');

  const agent = await Agent.findByPk(body.agent_id).catch((e) =>
    res.status(500).json({ error: error.message })
  );

  if (!agent) return res.status(404).send('Agent Not Found');

  await listing
    .removeAgent(agent)
    .catch((e) => res.status(500).send({ error: e.message }));
  return res.status(204).json({ listing });
};

const getListings = async ({ query }, res) => {
  const listings = await Listing.findAll({
    where: query,
    include: [{ model: Agent }]
  }).catch((e) => res.status(500).json({ error: e.message }));

  return res.status(200).json({ listings });
};

const getListingByMlsNumber = async ({ params: { mls_number } }, res) => {
  const listing = await Listing.findOne({
    where: { mls_number },
    include: [{ model: Agent }]
  }).catch((e) => res.status(500).json({ error: e.message }));

  if (!listing) return res.status(404).send('Listing not found');

  return res.status(200).json({ listing });
};

const updateListing = async ({ body, params: { mls_number } }, res) => {
  const [updated] = await Listing.update(
    {
      // Do not update mls_number
      address_line_1: body.address_line_1,
      address_line_2: body.address_line_2,
      city: body.city,
      state: body.state,
      postal_code: body.postal_code,
      asking_price: body.asking_price,
      listing_date: body.listing_date
    },
    {
      where: { mls_number }
    }
  ).catch((e) => res.status(500).json({ error: e.message }));

  if (!updated) return res.status(404).send('Listing not found');

  const updatedListing = await Listing.findOne({ where: { mls_number } });
  return res.status(200).json({ updatedListing });
};

const deleteListing = async ({ params: { mls_number } }, res) => {
  const deleted = await Listing.destroy({
    where: { mls_number }
  }).catch((e) => res.status(500).json({ error: e.message }));

  if (!deleted) return res.status(404).send('Listing not found');

  return res.status(204).send('Listing deleted');
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
