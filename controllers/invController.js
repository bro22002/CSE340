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