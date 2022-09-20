const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uzi1i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('db user')
    // perform actions on the collection object
    client.close();
});


// async function run() {
//     try {
//         await client.connect();
//         const noteCollection = client.db('job_task').collection('notes');

//         app.post('/notes', async (req, res) => {
//             const newNotes = req.body;
//             const result = await noteCollection.insertOne(newNotes);
//             res.send(result);
//         });

//     }
//     finally {

//     }
// }
// run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello From Job Task');
})

app.listen(port, () => {
    console.log(`Job Task app listening on port ${port}`);
})