const express = require('express');
const router = express.Router();

// Import the fakeDb items array
const items = require('./fakeDb');
 
// Route to get all items
router.get('/items', (req, res) => {
  console.log('GET request received');
  console.log('items:', items);
  res.json(items);
});

// Route to add an item
router.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// Route to get a single item by name
router.get('/items/:name', (req, res) => {
  const name = req.params.name;
  const item = items.find((i) => i.name === name);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Route to update an item by name
router.patch('/items/:name', (req, res) => {
  const name = req.params.name;
  const item = items.find((i) => i.name === name);
  if (item) {
    item.name = req.body.name || item.name;
    item.price = req.body.price || item.price;
    res.json({ updated: item });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

router.delete('/items/:name', (req, res) => {
  const name = req.params.name;
  if (name === 'all') {
    items.splice(0, items.length);
    res.json({ message: 'List cleared' });
  } else {
    const index = items.findIndex((i) => i.name === name);
    if (index !== -1) {
      items.splice(index, 1);
      res.json({ message: 'Deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }
});

module.exports = router;

 
// Walking through the api:

// 1. GET
// curl http://localhost:3000/list/items
// []

// 2. POST
// curl -X POST -H "Content-Type: application/json" -d '{"name": "dreamsicle", "price": 1.45}' http://localhost:3000/list/items 
// {"added":{"name":"dreamsicle","price":1.45}}

// 3. GET
// curl http://localhost:3000/list/items
// [{"name":"dreamsicle","price":1.45}]

// 4. GET /name
// curl http://localhost:3000/list/items/dreamsicle
// {"name":"dreamsicle","price":1.45}

// 5. PATCH
// curl -X PATCH -H "Content-Type: application/json" -d '{"name": "pink thing"}' http://localhost:3000/list/items/dreamsicle
// {"updated":{"name":"pink thing","price":1.45}}

// curl -X PATCH -H "Content-Type: application/json" -d '{"name": "pink thing", "price": "2.15"}' http://localhost:3000/list/items/pink%20thing
// {"updated":{"name":"pink thing","price":"2.15"}}

// 6. GET
// curl http://localhost:3000/list/items
// [{"name":"pink thing","price":"2.15"}]

// 7. POST
// curl -X POST -H "Content-Type: application/json" -d '{"name": "fudgsicle", "price": 1.65}' http://localhost:3000/list/items 
// {"added":{"name":"fudgsicle","price":1.65}}

// 8. GET
// curl http://localhost:3000/list/items
// [{"name":"pink thing","price":"2.15"},{"name":"fudgsicle","price":1.65}]

// 9. GET /name
// curl http://localhost:3000/list/items/pink%20thing
// {"name":"pink thing","price":"2.15"}
// curl http://localhost:3000/list/items/fudgsicle
// {"name":"fudgsicle","price":1.65}

// 10. DELETE 
// curl -X DELETE http://localhost:3000/list/items/pink%20thing
// {"message":"Deleted"}

// 11. GET
// curl http://localhost:3000/list/items
// [{"name":"fudgsicle","price":1.65}]

// 12. POST
// curl -X POST -H "Content-Type: application/json" -d '{"name": "dreamsicle", "price": 1.45}' http://localhost:3000/list/items 
// {"added":{"name":"dreamsicle","price":1.45}}

// 13. POST
// curl -X POST -H "Content-Type: application/json" -d '{"name": "pink thing", "price": 1.45}' http://localhost:3000/list/items 
// {"added":{"name":"pink thing","price":1.45}}

// 14. GET
// curl http://localhost:3000/list/items
// [{"name":"fudgsicle","price":1.65},{"name":"dreamsicle","price":1.45},{"name":"pink thing","price":1.45}]

// 15. DELETE 
// curl -X DELETE http://localhost:3000/list/items/all
// {"message":"List cleared"}

// 16. GET
// curl http://localhost:3000/list/items
// []