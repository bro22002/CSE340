// Require resources
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const accountModel = require("../models/account-model")
const validate = {}

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registrationRules = () => {
    return [
        // firstname is required and must be string
        body("account_firstname")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.

        // lastname is required and must be a string
        body("account_lastname")
        .trim()
        .isLength({ min: 2 })
        .withMessage("Please provide a valid last name."), // on error this message is sent.

        // valid email is required and cannot already exist in the DB
        body("account_email")
        .trim()
        .isEmail() // refer to validator.js docs for additional options and default settings
        .normalizeEmail() // refer to validator.js docs for default settings and options
        .withMessage("A valid email is required.")
        .custom(async (account_email) => {
            const emailExists = await accountModel.checkExistingEmail(account_email)
            if (emailExists){
                throw new Error("Email exists. Please log in or use different email")
            }
        }),
        // .custom(async (account_email, {req}) => {
        //     const account_id = req.body.account_id
        //     const account = await accountModel.getAccountById(account_id)
        //     // Check if submitted email is same as existing
        //     if (account_email != account.account_email) {
        //     // No - Check if email exists in table
        //     const emailExists = await accountModel.checkExistingEmail(account_email)
        //     // Yes - throw error
        //     if (emailExists.count != 0) {
        //     throw new Error("Email exists. Please use a different email")
        //     }
        //     }
        //     }),

        // password is required and must be a strong password
        body("account_password")
        .trim()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
}

/*  **********************************
 *  Login Data Validation Rules
 * ********************************* */
validate.loginRules = () => {
    return [
        // email is required and must be an existing user's email
        body("account_email")
        .trim()
        .isEmail() // refer to validator.js docs for additional options and default settings
        .normalizeEmail() // refer to validator.js docs for default settings and options
        .withMessage("A valid email is required")
        .custom(async (account_email) => {
            const emailExists = await accountModel.checkExistingEmail(account_email)
            if (!emailExists){
                throw new Error('Invalid Email')
            }
        }),

        // password is required and must be a strong password
        body("account_password")
        .trim()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("Password does not meet requirements.")
        .custom(async (account_password) => {
            const passwordExists = await accountModel.checkExistingPassword(account_password)
            if (!passwordExists){
                throw new Error('Password not correct')
            }
        }),

    ]
}


/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        })
        return
    }
    next()
}

/* ******************************
 * Check login data and return errors or continue to login
 * ***************************** */
validate.ckeckLoginData = async (req, res, next) => {
    const { account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/login", {
            errors,
            title: "Log In",
            nav,
            account_email,
        })
        return
    }
    next()
}

module.exports = validate