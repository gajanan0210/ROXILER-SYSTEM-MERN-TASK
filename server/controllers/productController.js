const Product = require('../models/Product');
// List Transactions with Search and Pagination
const listTransactions = async (req, res) => {
    const { search = '', page = 1, perPage = 10, month } = req.query;
  
    try {
      const query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ]
      };
  
      // Filter by month if provided
      if (month) {
        query.dateOfSale = {
          $regex: new RegExp(`-${('0' + (new Date().getMonth() + 1)).slice(-2)}-`, 'i') // adjust as necessary for month filtering
        };
      }
  
      const products = await Product.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
  
      const totalProducts = await Product.countDocuments(query);
  
      res.json({
        transactions: products,
        page: Number(page),
        perPage: Number(perPage),
        totalProducts,
        totalPages: Math.ceil(totalProducts / perPage)
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



// Get Statistics for a Specific Month
const getStatisticsByMonth = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month query parameter is required" });
  }

  try {
    const products = await Product.find({});
    const filteredProducts = products.filter(product => {
      const saleMonth = new Date(product.dateOfSale).toLocaleString('default', { month: 'long' });
      return saleMonth.toLowerCase() === month.toLowerCase();
    });

    const totalSaleAmount = filteredProducts.reduce((acc, product) => product.sold ? acc + product.price : acc, 0);
    const totalSoldItems = filteredProducts.filter(product => product.sold).length;
    const totalNotSoldItems = filteredProducts.filter(product => !product.sold).length;

    const statistics = {
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    };

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Bar Chart Data for a Specific Month
const getBarChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month query parameter is required" });
  }

  try {
    const products = await Product.find({});
    const filteredProducts = products.filter(product => {
      const saleMonth = new Date(product.dateOfSale).toLocaleString('default', { month: 'long' });
      return saleMonth.toLowerCase() === month.toLowerCase();
    });

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0
    };

    filteredProducts.forEach(product => {
      if (product.price <= 100) priceRanges['0-100']++;
      else if (product.price <= 200) priceRanges['101-200']++;
      else if (product.price <= 300) priceRanges['201-300']++;
      else if (product.price <= 400) priceRanges['301-400']++;
      else if (product.price <= 500) priceRanges['401-500']++;
      else if (product.price <= 600) priceRanges['501-600']++;
      else if (product.price <= 700) priceRanges['601-700']++;
      else if (product.price <= 800) priceRanges['701-800']++;
      else if (product.price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Pie Chart Data for a Specific Month
const getPieChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month query parameter is required" });
  }

  try {
    const products = await Product.find({});
    const filteredProducts = products.filter(product => {
      const saleMonth = new Date(product.dateOfSale).toLocaleString('default', { month: 'long' });
      return saleMonth.toLowerCase() === month.toLowerCase();
    });

    const categoryCounts = filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = 0;
      acc[product.category]++;
      return acc;
    }, {});

    res.json(categoryCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Combined Data from All APIs
const getCombinedData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month query parameter is required" });
  }

  try {
    const statistics = await getStatisticsByMonth(req, res);
    const barChartData = await getBarChartData(req, res);
    const pieChartData = await getPieChartData(req, res);

    const combinedData = {
      statistics: statistics.data,
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
    };

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listTransactions, getStatisticsByMonth, getBarChartData, getPieChartData, getCombinedData };
