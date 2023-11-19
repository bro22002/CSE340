const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const grid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  const invName = data[0].inv_year + ' ' + data[0].inv_make + ' ' + data[0].inv_model
  res.render("./inventory/detail", {
    title: invName,
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
      title: "Management",
      nav,
      errors: null,
  })
}

/* ***************************
 *  Build add-classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
      title: "Add New Classification",
      // message: "New Classification added successfully",
      nav,
      errors: null,
  })
}

/* ***************************
 *  Build add-inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classification = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      classification,
      errors: null,
  })
}

/* ****************************************
*  Process add-classsification
* *************************************** */
invCont.addClassification = async function(req, res) {
  // let nav = await utilities.getNav()
  const { classification_name } = req.body
  console.log("Received data:", classification_name);
  
  const addResult = await invModel.addNewClassification(
    classification_name,
    )
    
    let nav = await utilities.getNav()
  console.log("Result from addNewClassification:", addResult);

  if (addResult) {
    req.flash(
      "notice",
      `New classification added successfully`
    )
    res.status(201).render("./inventory/management",{
      title:"Management",
      nav,
      errors:null,
    })
  } else {
    req.flash("notice", "Sorry, add new classificatin failed.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
    })
  }
}

/* ****************************************
*  Process Add Inventory
* *************************************** */
invCont.addInventory = async function(req, res) {
  let nav = utilities.getNav()
  const { classification_name, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_year, inv_miles, inv_color } = req.body
  
  const addResult = await invModel.addNewInventory(
    classification_name, 
    inv_make, inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_year, 
    inv_miles, 
    inv_color
  )

  if (addResult) {
    req.flash(
      "notice",
      `New inventory item added successfully`
    )
    res.status(201).render("./inventory/management",{
      title:"Management",
      nav,
      errors:null,
    })
  } else {
    req.flash("notice", "Sorry, add new inventory failed.")
    res.status(501).render("./inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
    })
  }
}

/* ***************************
 *  Build 505-type error view
 * ************************** */
invCont.build500TypeError = async function (req, res, next) {
  let nav = await utilities.getNav();
  try {
    throw new Error("Intentional 500-Type Error");
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
  res.render("./errors/error", {
    title: "500",
    message: "Intentional 500-Type Error",
    nav,
  })
}

module.exports = invCont