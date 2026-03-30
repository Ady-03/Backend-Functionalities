const express = require('express');
const router = express.Router();
const menuItem = require('./../Schema/menu.js');

// For Menu
router.get('/',async(req,res)=>{
    try{
        const data = await menuItem.find();
        console.log('Menu Recieved');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Menu Not Recieved from Server'});
    }
})

router.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const NewMenu = new menuItem(data);
        const savedMenu = await NewMenu.save();
        console.log('Menu is Saved Successfully');
        res.status(200).json(savedMenu);
    }
    catch(error){
        console.log(err);
        res.status(500).json({error: 'Menu Not Saved in Database'});
    }
});
module.exports = router;