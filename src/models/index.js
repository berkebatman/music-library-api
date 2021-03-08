const Sequlize = require('sequelize');



function setupDatabase() {
    const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

    connection.sync( {alter: true} );
    
    return {};
    
}

module.exports = setupDatabase()





