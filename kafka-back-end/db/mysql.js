//Including dependency
const Sequelize = require ('sequelize');

    const sequelize = new Sequelize('fandango', 'root', 'password', {
        /*host: 'localhost',*/
        host:'myec2.ddns.net',
        port: 3306,
        dialect: 'mysql',
        operatorsAliases: false,
        dialectOptions: {
            insecureAuth: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });


module.exports = { sequelize } ;