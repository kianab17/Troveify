const express = require('express');
const app = express();
const { Collection } = require('./models');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

// create a new collection
app.post('/api/collections', async (req, res) => {
  try {
    const { name } = req.body;
    const newCollection = await Collection.create({ name, items: [] });
    res.json(newCollection);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get all collections
app.get('/api/collections', async (req, res) => {
  try {
    const collections = await Collection.findAll();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// update a collection
app.put('/api/collections/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, items } = req.body;
    await Collection.update({ name, items }, { where: { id } });
    const updatedCollection = await Collection.findByPk(id);
    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete a collection
app.delete('/api/collections/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Collection.destroy({ where: { id } });
    res.json({ message: 'Collection deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//console.log('Server is running on http://localhost:3000');
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
