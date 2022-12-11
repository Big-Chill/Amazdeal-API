const path = require('path');
const HttpError = require(path.join(__dirname, '..', 'utils', 'utils.js')).HttpError;
const Order = require(path.join(__dirname, '..', 'models', 'orders.js'));


const saveOrder = async (req, res) => {
  const { user_id, email, items, total } = req.body;

  const items_arr = items.map(item => {
    return {
      product_id: item._id,
      user_id: item.user_id,
      uploadedBy: item.uploadedBy,
      stock: item.stock,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      mrp: item.mrp,
      filePath: item.filePath,
      description: item.description,
      category: item.category,
      brand: item.brand
    };
  });

  const orderDate = new Date();

  const newOrder = await new Order({ user_id, email, items: items_arr, total, orderDate });

  try {
    const order = await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully', data: order });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  const { user_id } = req.params;

  try {
    const order = await Order.find({ user_id: user_id });
    res.status(200).json({ message: 'Order fetched successfully', data: order });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};



const searchOrder = async (req, res) => {
  const { search_query } = req.query;

  try {
    const orders = await Order.find({});

    const allItems = orders.map(order => {
      return order.items;
    });

    let filterData = [];

    allItems.forEach(item => {
      item.forEach(i => {
        if (i.name.toLowerCase().includes(search_query.toLowerCase())) {
          filterData.push(i);
        }
      });
    });

    res.status(200).json({ message: 'Products fetched successfully', data: filterData });
  } catch (error) {
    res.status(error.code).json({ message: error.message });
  }
};

module.exports = { saveOrder, getOrder, searchOrder };