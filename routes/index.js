const { Router } = require('express');
const listingController = require('../controllers/listing.controller');
const agentController = require('../controllers/agent.contoller');
const router = Router();

router.get('/', (req, res) => res.send('Root'));

// Listing Routes
router.post('/listings', listingController.createListing);
router.get('/listings', listingController.getListings);
router.get('/listings/:mls_number', listingController.getListingByMlsNumber);
router.put('/listings/:mls_number', listingController.updateListing);
router.put('/listings/:mls_number/agent', listingController.addAgent);
router.delete('/listings/:mls_number/agent', listingController.removeAgent);
router.delete('/listings/:mls_number', listingController.deleteListing);

// Agent Routes
router.post('/agents', agentController.createAgent);
router.get('/agents', agentController.getAllAgents);
router.get('/agents/:id', agentController.getAgentById);
router.put('/agents/:id', agentController.updateAgent);
router.delete('/agents/:id', agentController.deleteAgent);

module.exports = router;
