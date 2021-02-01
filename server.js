const express = require('express');

// create express server
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.url, res.statusCode)
    next()
})

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

