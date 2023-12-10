// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")

router.use(utilities.checkJWTToken)

// Route to build the account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get(
    "/logout",
    utilities.logout,
)

// Route to build the registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to build the account update view
router.get("/update/:account_id", utilities.handleErrors(accountController.buildUpdate))

// Route to handle the login request(default account route)
router.get("/", 
    utilities.checkLogin,
    utilities.handleErrors(accountController.buildManagement))

// Route to process the registration data and send data to the database
router.post(
    '/register',
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))

// process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    // utilities.checkAccount,
    utilities.handleErrors(accountController.accountLogin),
)

// Route to handle account update request
router.post(
    "/update-account",
    regValidate.updateRules(),
    regValidate.checkUpdateData,
    utilities.handleErrors(accountController.updateAccount)
)

router.post(
    "/change-password",
    regValidate.passwordRules(),
    regValidate.checkPasswordData,
    utilities.handleErrors(accountController.updatePassword)
)

module.exports = router