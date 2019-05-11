const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Started on port : ${port}`)
});

app.use(express.static(__dirname + "/./public"))

app.get('/', (req, res) => {
    res.render('index.html')
})