const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
// const notesData = require('./db/notes_db.json')
// const notesRouter = require('./routes/notes.js')
const html = require('./routes/index.js');


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', html);
// app.use('/api', notesRouter);
app.use(express.static('public'));


// Route for Notes page
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// })

// // route for api
// app.get('/api/notes', (req, res) => res.json(notesData));

// // route for homepage
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, './public/index.html'))
// );

app.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT);
})