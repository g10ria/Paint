const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 1000;


app.use(express.static(path.join(__dirname,'static')));
app.set("views", path.join(__dirname, "views/pages"));
app.set('view engine', 'ejs');


app.get('/', (req,res) => {
    res.render("index.ejs");
});

app.listen(PORT, () => {
    console.log("Listening on port "+PORT);
});
