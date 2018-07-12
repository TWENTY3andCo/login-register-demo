/**
 * @module admin
 * Handle requests to admin areas
 */

const express = require('express');
const router = express.Router();
const isAdmin = require('../helpers/isAdmin');
router.get('/:id',isAdmin,(req,res,next)=>{
    let id = req.params.id;
    console.log(`Id received ${id}`)
    res.render('admin',{
        title:'Area number '+id,
        id
    });
});


module.exports = router;