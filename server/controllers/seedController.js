// server/controllers/seedController.js
const fetchData = require('../data/fetchData');

const seedDatabase = async (req, res) => {
  const result = await fetchData();
  res.json(result);
};

module.exports = { seedDatabase };
