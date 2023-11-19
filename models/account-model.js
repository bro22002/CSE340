const pool = require("../database/")


/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
        const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
        } catch (error) {
            return error.message
    }
}

/* *****************************
*   Login account
* *************************** */
async function loginAccount(account_email, account_password) {
    try{
        let sql = `SELECT * FROM Accounts WHERE email=$1 AND password=$2;`
        return await pool.query(sql, [account_email, account_password])
        }catch(error){
            // console.log('Error: ', err);
            return error.message
    }

}


/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
    try {
        const sql = "SELECT * FROM account WHERE account_email = $1"
        const email = await pool.query(sql, [account_email])
        return email.rowCount
    } catch (error) {
        return error.message
    }
}

/* **********************
 *   Check for existing password
 * ********************* */
async function checkExistingPassword(account_password){
    try {
        const sql = "SELECT * FROM account WHERE account_password = $1"
        const password = await pool.query(sql, [account_password])
        return password.rowCount
    } catch (error) {
        return error.message
    }
}

module.exports = { registerAccount, checkExistingEmail, checkExistingPassword, loginAccount }