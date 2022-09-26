const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlzouqs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var hex = /[0-9A-Fa-f]{6}/g;
var id = (hex.test(id)) ? ObjectId(id) : id;

async function run() {
    try {
        await client.connect();
        noteCollection = client.db('update_job_task').collection('notes');

        app.get('/notes', async (req, res) => {
            const userNote = await noteCollection.find().toArray();
            res.send(userNote);
        });

        app.post('/notes', async (req, res) => {
            const newNotes = req.body;
            const result = await noteCollection.insertOne(newNotes);
            res.send(result);
        });

        app.get('/notes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const notes = await noteCollection.findOne(query);
            res.send(notes);
        });


        app.delete('/notes/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await noteCollection.deleteOne(query);
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello From Job Task');
})

app.listen(port, () => {
    console.log(`Job Task app listening on port ${port}`);
})