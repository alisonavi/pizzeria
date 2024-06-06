import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 3003;

const uri = 'mongodb+srv://gotul:gotul@gofinal.e7pap0d.mongodb.net/pizzeria?retryWrites=true&w=majority';

app.use(cors());

async function getMenuItems() {
  const client = new MongoClient(uri);
  try {
    console.log('Connecting to the database...');
    await client.connect();
    console.log('Connected to the database');
    const database = client.db('pizzeria');
    const collection = database.collection('menu');
    const menuItems = await collection.find().toArray();
    console.log('Menu items retrieved from database');
    return menuItems;
  } catch (err) {
    console.error('Error fetching menu items:', err);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

app.get('/menu', async (req, res) => {
  try {
    console.log('Received request for menu items');
    const menuItems = await getMenuItems();
    res.json(menuItems);
    console.log('Menu items sent in response');
  } catch (err) {
    res.status(500).send('Error fetching menu items');
    console.error('Error in /menu route:', err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
