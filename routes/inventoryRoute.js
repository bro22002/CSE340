// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory items by detail view (inv_id)
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

// Route to generate a 500-type error view
router.get("/error", utilities.handleErrors(invController.build500TypeError));

// Route to build the management view
router.get('/management', utilities.handleErrors(invController.buildManagement))

// Route to build add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to build add-inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Route to process the add new classification data and send data to the database
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    // (req, res) => {
    //     res.status(200)
    // },
    utilities.handleErrors(invController.addClassification)
)

// Route to process the add new inventory data and send data to the database
router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    // invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

module.exports = router;