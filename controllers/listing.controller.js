const { Listing, Agent } = require('../models');

const createListing = async (req, res) => {
  const listing = await Listing.create(req.body).catch((e) => {
    return res.status(500).json({ error: error.message });
  });

  return res.status(201).json({ listing });
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
  }).catch((e) => res.status(500).send(e.message));
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
  deleteListing
};
