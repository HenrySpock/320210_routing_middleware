const express = require('express');
const app = express();

// Middleware to parse query params
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper function to check if a given value is a number
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Route for calculating mean
app.get('/mean', (req, res) => {
  const nums = req.query.nums;
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(num => Number(num));
  if (numbers.some(num => !isNumber(num))) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;

  return res.json({ operation: 'mean', value: mean });
});

// Route for calculating median
app.get('/median', (req, res) => {
  const nums = req.query.nums;
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(num => Number(num));
  if (numbers.some(num => !isNumber(num))) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  numbers.sort((a, b) => a - b);
  const mid = Math.floor(numbers.length / 2);

  const median =
    numbers.length % 2 !== 0
      ? numbers[mid]
      : (numbers[mid - 1] + numbers[mid]) / 2;

  return res.json({ operation: 'median', value: median });
});

// Route for calculating mode
app.get('/mode', (req, res) => {
  const nums = req.query.nums;
  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(num => Number(num));
  if (numbers.some(num => !isNumber(num))) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  const freqMap = numbers.reduce((map, num) => {
    if (!map[num]) {
      map[num] = 0;
    }
    map[num]++;
    return map;
  }, {});

  const maxFreq = Math.max(...Object.values(freqMap));
  const modes = Object.keys(freqMap).filter(
    num => freqMap[num] === maxFreq
  );

  const mode = modes.length === numbers.length ? null : modes[0];

  return res.json({ operation: 'mode', value: mode });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
