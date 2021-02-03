const db = require('../db/db.json')
const fs = require('fs')
const uuid = require('uuid')

// * API routes:

module.exports = function (app) {

    //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

    app.get('/api/notes', function (req, res) {
        res.send(db)
    });

    //   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

    app.post('/api/notes', function (req, res) {
        // Variable to add notes
        const addNote = req.body
        // Assign ID using uuid version 4
        addNote.id = uuid.v4()
        console.log(addNote)
        // Read json data in db.json
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            // Variable newNotes to handle parsing json data and attaching addNote
            const newNotes = JSON.parse(data).concat(addNote)
            console.log(newNotes)
            // Stringify json data
            fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err, data) => {
                // Pass in json
                res.json(newNotes)
            })
        })
    })



    //   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

    app.delete('/api/notes/:id', (req, res) => {
        // Read json data in db.json
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;

            const notes = JSON.parse(data)
            // Return objects that do not have associated ID
            let results = notes.filter(obj => {
                return obj.id !== req.params.id
            })
            fs.writeFile('./db/db.json', JSON.stringify(results), (err, data) => {
                // Pass in json
                res.json(results)
            })

        })
    })
};











