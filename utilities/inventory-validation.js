// Require resources
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        // classification name is reuired and must be string
        body("classification_name")
        .trim()
        .isLength({ min: 2})
        .withMessage('Classification Name should not be empty')
        // .matches([A-Za-z0-9])
        .custom(async (classification_name) => {
            const classificationExist = await invModel.checkExistingClassificationName(classification_name)
            if (classificationExist){
                throw new Error(`${classification_name} already exists`)
            }
        })
    ]
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        // classification name is required and must be a string
        body("classification_name")
        .trim()
        .withMessage("Please choose a Classification"),

        body("inv_make")
        .trim()
        .isLength({min: 2})
        .withMessage("Please provide a make"),

        body("inv_model")
        .trim()
        .isLength({min: 2})
        .withMessage("Please provide a model"),

        body("inv_description")
        .trim()
        .withMessage("Please write a description"),

        body("inv_image")
        .trim()
        .withMessage("Please provide a path to the image"),

        body("inv_thumbnail")
        .trim()
        .withMessage("Please provide a path to the thumbnail"),

        body("inv_year")
        .trim()
        .isLength({min: 4})
        .isLength({max: 4})
        .withMessage("Please provide a year"),

        body("inv_miles")
        .trim()
        .withMessage("Please provide miles"),

        body("inv_color")
        .trim()
        .withMessage("Please provide a color")

    ]
}

/*  **********************************
 *  Check classification data and return errors or continue to add classification
 * ********************************* */
validate.checkClassificationData = async (req, res, next) => {
    const {classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name
        })
        return
    }
    next()
}

/*  **********************************
 *  Check inventory data and return errors or continue to add inventory
 * ********************************* */
validate.checkInventoryData = async (req, res, next) => {
    const {classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-inventory", {
            errors,
            title: "Add Inventory",
            nav,
            classification_name
        })
        return
    }
    next()
}

/*  **********************************
 *  Check inventory data and return errors or continue to edit inventory
 * ********************************* */
validate.checkUpdateData = async (req, res, next) => {
    const {classification_name, inv_id} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/edit-inventory", {
            errors,
            title: "Edit Inventory",
            nav,
            classification_name,
            inv_id
        })
        return
    }
    next()
}

module.exports = validate