const express = require('express');
const app = express();
const axios = require('axios');

const PORT = 3000;
const SHOPEE_PARTNER_ID = 'your_partner_id';
const SHOPEE_SHOP_ID = 'your_shop_id';
const SHOPEE_API_KEY = 'your_api_key';

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/get_products', async (req, res) => {
  try {
    const response = await axios.get('https://partner.shopeemobile.com/api/v1/products/get', {
      params: {
        partner_id: SHOPEE_PARTNER_ID,
        shopid: SHOPEE_SHOP_ID,
        timestamp: Math.floor(Date.now() / 1000),
        api_key: SHOPEE_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to update product stock
app.post('/update_stock/:product_id/:stock', async (req, res) => {
  const { product_id, stock } = req.params;

  try {
    const response = await axios.post(
      'https://partner.shopeemobile.com/api/v1/products/update_stock',
      {
        partner_id: SHOPEE_PARTNER_ID,
        shopid: SHOPEE_SHOP_ID,
        timestamp: Math.floor(Date.now() / 1000),
        api_key: SHOPEE_API_KEY,
        item_id: parseInt(product_id),
        stock: parseInt(stock),
        // other required parameters
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
