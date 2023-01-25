const fs = require('fs');
const uuid = require('uuid');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class SavedNotes {
    read() {
        return readFile('./db/notes_db.json');
    }

    write(data) {
        return writeFile('./db/notes_db.json', JSON.stringify(data));
    }

    getAllNotes() {
        return this.read().then((notes) => {

            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        })
    };

    addNewNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error('Please add a title and details to your note.');
        }

        const nextNote = {
            title,
            text,
            id: uuid,
        };
        
        return this.getAllNotes()
        .then((notes) => [...notes, nextNote])
        .then((savedNotes) => this.write(savedNotes))
        .then(() => nextNote);
    }

    removeNoteId(id) {
        return this.getAllNotes()
        .then((notes) => notes.filter((note) => note.id!== id))
        .then((justNotes) => this.write(justNotes))
    }
}

module.exports = new SavedNotes();