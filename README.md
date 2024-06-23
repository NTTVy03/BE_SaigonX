# BE_SaigonX

## How to run
* Install MySQL CLI
* Create database manually with MySQL CLI:
    * `CREATE DATABASE SaigonX`
    * Check if the SaigonX database created: `SHOW TABLES`
* Add `.env` in the root directory:
    ```
    DB_NAME="SaigonX"
    DB_USER="root"
    DB_PASSWORD="your_db_password"
    DB_HOST="localhost"
    DB_DIALECT="mysql"
    PORT="3000"
    SESSION_SECRET="your_secret_key"
    ```
* Run backend server: `npm start`