const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
    // echo
    res.json(req.body);
});

app.listen(3001, () => {
    console.log(`Now listening on port ${PORT}`);
})