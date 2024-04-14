const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./src/database/db');
const userRoute = require('./src/routes/userRoute');
const recipeRoute = require('./src/routes/recipeRoute');
const shoppingListRoute = require('./src/routes/shoppingListRoute');


const app = express();

app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/recipes', recipeRoute);
app.use('/shopping-lists', shoppingListRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

module.exports = app;
