// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory items by detail view (inv_id)
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

// Route to generate a 500-type error view
router.get("/error", utilities.handleErrors(invController.build500TypeError));

module.exports = router;