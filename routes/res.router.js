const express=require("express");
const resRouter=express.Router();
const {resModel}=require("../model/restaurant.model");

//..............add restaurants....................
resRouter.post('/api/restaurants', async (req, res) => {
    try {
      const restaurant = await resModel(req.body)
      await restaurant.save()
      res.status(201).json({"mas":"reataurant added...","data":restaurant});
    } catch (error) {
      res.status(500).json({ error: 'Failed to add restaurant' });
    }
});

//...........get all restaurants...............
resRouter.get("/api/restaurants",async(req,res)=>{
    try {
        const restaurants = await resModel.find();
        res.status(200).json({"msg":"all data below","data":restaurants});
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurants' });
      }
})

//..........get specific restaurants by id.......................

resRouter.get("/api/restaurants/:id",async(req,res)=>{
    let id=req.params.id
    try {
        const restaurants = await resModel.findById(id);
        res.status(200).json({"msg":"all data below","data":restaurants});
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurants' });
      }
})

//................get menu of specific restaurant...................
resRouter.get('/api/restaurants/:id/menu', async (req, res) => {
    const { id } = req.params;
  
    try {
      const restaurant = await resModel.findById(id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const menu = restaurant.menu;
      res.status(200).json({"msg":`below are the menu of restaurant ${restaurant.name}`,"menu":menu});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch restaurant menu' });
    }
  });


  //.................... add new items to menu of a target restaurant.............
  resRouter.post('/api/restaurants/:id/menu', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
  
    try {
      const restaurant = await resModel.findById(id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const new_food = { name, description, price, image };
      restaurant.menu.push(new_food);
      await restaurant.save();
  
      res.status(201).json({"msg":"new item added to the menu"});
    } catch (error) {
      res.status(500).json({ error: 'Failed to add item to menu' });
    }
  });

  //................delete a perticular menu..................
  resRouter.delete('/api/restaurants/:id/menu/:itemm', async (req, res) => {
    const { id, itemm } = req.params;
  
    try {
      const restaurant = await resModel.findById(id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
  
      const itemIndex = restaurant.menu.findIndex(item => item._id.toString() === itemm);
      if (itemIndex === -1) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
  
      restaurant.menu.splice(itemIndex, 1);
      await restaurant.save();
  
      res.status(202).json({ message: 'Menu item deleted...' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete menu item' });
    }
  });


  module.exports={resRouter}