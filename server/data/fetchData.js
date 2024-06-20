// server/data/fetchData.js
const axios = require('axios');
const Product = require('../models/Product');

const fetchData = async () => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Product.deleteMany({}); // Clear the collection before seeding
    await Product.insertMany(data);
    return { message: 'Data Imported Successfully' };
  } catch (error) {
    return { message: `Error: ${error.message}` };
  }
};

module.exports = fetchData;
