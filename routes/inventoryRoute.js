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
router.get('/',
    utilities.checkAccount,
    utilities.handleErrors(invController.buildManagement))

// Route to build add-classification view
router.get(
    "/add-classification", 
    utilities.checkAccount,
    utilities.handleErrors(invController.buildAddClassification));

// Route to build add-inventory view
router.get(
    "/add-inventory", 
    utilities.checkAccount,
    utilities.handleErrors(invController.buildAddInventory));

// Route to build the edit inventory view
router.get(
    "/edit/:inventoryId", 
    utilities.checkAccount,
    utilities.handleErrors(invController.buildEditInventory))

router.get(
    "/delete/:inventoryId", 
    utilities.checkAccount,
    utilities.handleErrors(invController.deleteView))

router.get(
    "/getInventory/:classification_id",
    // utilities.checkAccountType,
    utilities.handleErrors(invController.getInventoryJSON))

// Route to process the add new classification data and send data to the database
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

// Route to process the add new inventory data and send data to the database
router.post(
    "/add-inventory",
    // invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

// Route to process the update for the inventory edit
router.post(
    "/edit-inventory/", 
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

router.post(
    "/delete-inventory",
    utilities.handleErrors(invController.deleteItem)
)

module.exports = router;