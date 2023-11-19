// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")

// Route to build the account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to process the registration data and send data to the database
router.post(
    '/register',
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))

// process the login attempt
router.post(
    "/login",
    (req, res) => {
        res.status(200).send('login process')
    },
    regValidate.loginRules(),
    regValidate.ckeckLoginData,
    utilities.handleErrors(accountController.loginAccount),
)

module.exports = router