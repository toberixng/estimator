const express = require ('express');
const path = require('path');

const app = express()

// static filder
// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>')
// });

app.use(express.static(path.join(__dirname, 'src')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`application listening on ${PORT}`))