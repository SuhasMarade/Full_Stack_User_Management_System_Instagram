const app = require('./app.js');
require('dotenv').config();
const PORT = parseInt(process.env.PORT) || 5001

app.listen(PORT, ()=> {
    console.log(`App running at http://localhost:${PORT}`);
})