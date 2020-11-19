const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.ENUM,
            values: ['EUR', 'USD', 'ARS'],
            defaultValue: 'USD'
        }
    });
}