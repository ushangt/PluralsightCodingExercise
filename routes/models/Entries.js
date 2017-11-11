var Sequelize = require('sequelize');

// Connect to database
const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/plural-sight.sqlite3',
});

db
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Define a model
const Entries = db.define('entries', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    distractors:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = Entries;

