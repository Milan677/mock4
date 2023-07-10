const express=require("express");
const orderRouter=express.Router();
const{orderModel}=require("../model/order.model");

//.............. make an order..................
orderRouter.post('/api/orders', async (req, res) => {
    const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;
  
    try {
      // Create a new order
      const order = await orderModel({
        user,
        restaurant,
        items,
        totalPrice,
        deliveryAddress,
        status: 'placed'
      });
      await order.save();
  
      res.status(201).json({"msg":"new order placed..","order":order});
    } catch (error) {
      res.status(500).json({ error: 'Failed to place order' });
    }
  });


  //..........get specific order details...................
  orderRouter.get('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const order = await orderModel.findById(id)
        .populate('user')
        .populate('restaurant');
  
      if (!order) {
        return res.status(404).json({ error: 'order not found' });
      }
  
      res.status(200).json({"order details":order});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order details' });
    }
  });


  //...........update order status....................
  orderRouter.put('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const order = await orderModel.findByIdAndUpdate(id, { status:status });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.status(204).json({"msg":"status updated"});
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order status' });
    }
  });



module.exports={orderRouter}