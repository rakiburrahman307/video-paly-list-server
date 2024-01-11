const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000', ''],
    credentials: true,
}));




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.044ysfk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    const video = client.db('video').collection('videos');
  try {

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
 
    app.get('/allVideos', async (req, res) => {
        const cursor = video.find();
        const result = await cursor.toArray();
        res.send(result);
    });
    app.get('/allVideos/:id', async (req, res) => {
        const id = req.params.id;
        const query = {id: id};
        const result = await video.findOne(query);
        res.send(result);
    });



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send("Server Is Running Hot!")

});
app.listen(port, () => {
    console.log(`Server is running port: ${port}`)
});
