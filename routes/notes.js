const router = require('express').Router();
const SavedNotes = require('./savedNotes.js');

// Get all Notes
router.get('/notes', (req, res) => {
  SavedNotes
  .getAllNotes().then((data) => res.json(data));
});

// Post a new note
router.post('/notes', (req, res) => {
  SavedNotes
  .addNewNote(req.body).then((note) => res.json(note))
  .catch((err) => res.status(500).json(err));
});

// router
//     //get specific note
//     .route("/:noteId")
//     .get((req, res) => {
//         SavedNotes
//         req.params.noteId = req.params.noteId;
//         res.send('Get Note');
//     })
//     .put((req, res) => {
//     req.params.noteId = req.params.noteId;
//     res.send('Update Note');
//     })
//     .delete((req, res) => {
//     req.params.noteId = req.params.noteId;
//     res.send('Delete Note');
// })

router.delete('/notes/:id', (req, res) => {
  SavedNotes
  .removeNoteId(req.params.id).then(() => res.json({ok: true}))
  .catch((err) => res.status(500).json(err));
})

module.exports = router;